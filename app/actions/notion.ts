'use server';

import { Client } from '@notionhq/client';

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

export async function syncToNotion(entry: {
    title: string;
    content: string;
    tags: string[];
    created_at: string;
    mood?: string;
}, databaseId?: string, pageId?: string | null) {

    if (!process.env.NOTION_API_KEY) {
        console.error("NOTION_API_KEY is not defined");
        return { success: false, error: "Notion API Key missing" };
    }

    const dbId = databaseId || process.env.NOTION_DATABASE_ID;

    if (!dbId) {
        console.error("Notion Database ID is missing");
        return { success: false, error: "Notion Database ID missing" };
    }

    // Helper to convert rich text (simplified for now, splitting by newlines)
    // Ideally Tiptap JSON or HTML would be parsed to Notion blocks
    // For this MVF (Minimum Viable Fix), we'll put the content in a paragraph block.
    const blocks = [
        {
            object: 'block',
            type: 'paragraph',
            paragraph: {
                rich_text: [
                    {
                        type: 'text',
                        text: {
                            content: entry.content || "",
                        },
                    },
                ],
            },
        },
    ];

    try {
        if (pageId) {
            // Update existing page
            // Note: Updating page properties
            await notion.pages.update({
                page_id: pageId,
                properties: {
                    Name: {
                        title: [
                            {
                                text: {
                                    content: entry.title,
                                },
                            },
                        ],
                    },
                    Tags: {
                        multi_select: entry.tags.map(tag => ({ name: tag })),
                    },
                    Mood: {
                        rich_text: [
                            {
                                text: {
                                    content: entry.mood || ""
                                }
                            }
                        ]
                    }
                },
            });

            // Updating content (append to bottom for now as completely replacing blocks is complex)
            // A true sync would require diffing or clearing and rewriting. 
            // For a "Journal", typically one writes and saves. 
            // Let's just update title/tags for now if it exists, or maybe append a "Updated at..." block?
            // For simplicity/robustness in this iteration, we focus on properties sync for updates.

            return { success: true, pageId };

        } else {
            // Create new page
            const response = await notion.pages.create({
                parent: {
                    database_id: dbId,
                },
                properties: {
                    Name: {
                        title: [
                            {
                                text: {
                                    content: entry.title,
                                },
                            },
                        ],
                    },
                    Tags: {
                        multi_select: entry.tags.map(tag => ({ name: tag })),
                    },
                    Mood: {
                        rich_text: [ // Assuming 'Mood' is a text property in Notion for flexibility
                            {
                                text: {
                                    content: entry.mood || ""
                                }
                            }
                        ]
                    },
                    Date: {
                        date: {
                            start: new Date(entry.created_at).toISOString()
                        }
                    }
                },
                children: [
                    {
                        object: 'block',
                        type: 'paragraph',
                        paragraph: {
                            rich_text: [
                                {
                                    type: 'text',
                                    text: {
                                        content: entry.content || ""
                                    }
                                }
                            ]
                        }
                    }
                ] as any,
            });

            return { success: true, pageId: response.id };
        }
    } catch (error) {
        console.error("Notion Sync Error:", error);
        return { success: false, error: "Failed to sync with Notion" };
    }
}
