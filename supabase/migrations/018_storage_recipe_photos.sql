-- Storage bucket for all recipe/try photos.
-- Previously created by hand in the dashboard; scripted here so a fresh
-- project rebuild is fully reproducible from migrations.

insert into storage.buckets (id, name, public)
values ('recipe-photos', 'recipe-photos', true)
on conflict (id) do nothing;

-- Public read (bucket is public, but explicit select policy keeps the
-- REST list endpoint working for authenticated clients too).
create policy "recipe photos are publicly readable"
on storage.objects for select
using (bucket_id = 'recipe-photos');

create policy "authenticated users can upload recipe photos"
on storage.objects for insert to authenticated
with check (bucket_id = 'recipe-photos');

-- add-recipe uses upsert: true, which needs update permission on own files
create policy "users can update own recipe photos"
on storage.objects for update to authenticated
using (bucket_id = 'recipe-photos' and owner_id = auth.uid()::text);

create policy "users can delete own recipe photos"
on storage.objects for delete to authenticated
using (bucket_id = 'recipe-photos' and owner_id = auth.uid()::text);
