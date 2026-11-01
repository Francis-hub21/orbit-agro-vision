-- Retire the news/admin system: remove admin functions and policies; mark the now-unused tables deprecated.
DROP POLICY IF EXISTS "Anyone can view news images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload news images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update news images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete news images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read news" ON public.news_posts;
DROP POLICY IF EXISTS "Admins can insert news" ON public.news_posts;
DROP POLICY IF EXISTS "Admins can update news" ON public.news_posts;
DROP POLICY IF EXISTS "Admins can delete news" ON public.news_posts;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

DROP FUNCTION IF EXISTS public.claim_admin();
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

COMMENT ON TABLE public.news_posts IS 'DEPRECATED: retired news/admin system — the app no longer reads or writes this table';
COMMENT ON TABLE public.user_roles IS 'DEPRECATED: retired news/admin system — the app no longer reads or writes this table';