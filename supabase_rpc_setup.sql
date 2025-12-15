-- Function to safely increment blog likes
CREATE OR REPLACE FUNCTION increment_blog_likes(blog_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE blogs
  SET likes = likes + 1
  WHERE id = blog_id;
END;
$$;

-- Function to safely decrement blog likes
CREATE OR REPLACE FUNCTION decrement_blog_likes(blog_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE blogs
  SET likes = GREATEST(likes - 1, 0)
  WHERE id = blog_id;
END;
$$;
