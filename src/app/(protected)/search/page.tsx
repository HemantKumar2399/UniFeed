import { SearchPageClient } from "@/features/discovery/components/SearchPageClient";
import { normalizeDiscoveryQuery } from "@/features/discovery/discovery";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const initialQuery = normalizeDiscoveryQuery(params.q);

  return <SearchPageClient initialQuery={initialQuery} />;
}
