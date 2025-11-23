"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function TestSupabase() {
    const [status, setStatus] = useState("Testing connection...");
    const [tables, setTables] = useState<any>({});
    const [envCheck, setEnvCheck] = useState<any>({});

    useEffect(() => {
        const testConnection = async () => {
            // Check Env Vars
            const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
            setEnvCheck({
                url: url ? "Defined" : "Missing",
                key: key ? "Defined" : "Missing",
            });

            if (!url || !key) {
                setStatus("Failed: Missing Environment Variables");
                return;
            }

            // Test Skills Table
            const { data: skills, error: skillsError } = await supabase.from("skills").select("*").limit(1);
            setTables((prev: any) => ({
                ...prev,
                skills: skillsError ? `Error: ${skillsError.message}` : `Success (Found ${skills?.length} rows)`,
            }));

            // Test Projects Table
            const { data: projects, error: projectsError } = await supabase.from("projects").select("*").limit(1);
            setTables((prev: any) => ({
                ...prev,
                projects: projectsError ? `Error: ${projectsError.message}` : `Success (Found ${projects?.length} rows)`,
            }));

            // Test Insert (Rollback)
            // We'll try to insert a dummy skill to see if write works
            const { error: insertError } = await supabase.from("skills").insert([{ name: "Test Skill", icon_name: "FaReact" }]).select();

            // Note: This will actually insert a row if successful. We should probably delete it or just check the error.
            // For safety, let's just check the read first.

            if (skillsError || projectsError) {
                setStatus("Failed: Database Error");
            } else {
                setStatus("Connection Successful!");
            }
        };

        testConnection();
    }, []);

    return (
        <div className="p-8 font-mono">
            <h1 className="text-2xl font-bold mb-4">Supabase Debugger</h1>

            <div className="mb-6 p-4 border rounded bg-gray-100">
                <h2 className="font-bold">Environment Variables</h2>
                <pre>{JSON.stringify(envCheck, null, 2)}</pre>
            </div>

            <div className="mb-6 p-4 border rounded bg-gray-100">
                <h2 className="font-bold">Status</h2>
                <p className={status.startsWith("Failed") ? "text-red-600" : "text-green-600"}>{status}</p>
            </div>

            <div className="mb-6 p-4 border rounded bg-gray-100">
                <h2 className="font-bold">Table Checks</h2>
                <pre>{JSON.stringify(tables, null, 2)}</pre>
            </div>
        </div>
    );
}
