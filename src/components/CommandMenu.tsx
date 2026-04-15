"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Compass, Calendar as CalendarIcon, User, Home, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { api } from "@/trpc/react";
import { useDebounce } from "@/hooks/useDebounce";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const router = useRouter();

  const { data: searchResults, isLoading } = api.event.search.useQuery(
    { query: debouncedSearchQuery },
    { enabled: debouncedSearchQuery.length > 0 && open }
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void | Promise<void>) => {
    setOpen(false);
    void command();
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] animate-in fade-in duration-150 ease-out"
      overlayClassName="fixed inset-0 backdrop-blur-md bg-black/80 z-[90]"
    >
      <div className="relative z-[100] w-full max-w-sm rounded-[16px] border border-white/10 bg-zinc-950 p-[12px] shadow-2xl overflow-hidden sm:max-w-md md:max-w-xl animate-in zoom-in-95 duration-150 ease-out">
        <Command
          className="w-full bg-transparent outline-none"
          shouldFilter={false} // Disable internal filtering so we see TRPC results properly
          onKeyDown={(e) => {
            if (e.key === "Escape" || (e.key === "Backspace" && !open)) {
              e.preventDefault();
              setOpen(false);
            }
          }}
        >
          <div className="flex items-center border-b border-zinc-800 px-3 pb-3 pt-1">
            <Search className="mr-3 h-5 w-5 text-zinc-400" />
            <Command.Input 
              autoFocus 
              className="flex-1 w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 outline-none p-1" 
              placeholder="Search for events, people, or navigate..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <div className="text-xs text-zinc-500 hidden sm:flex items-center gap-1 border border-zinc-800 rounded px-1.5 py-0.5">
              <span className="text-[10px]">ESC</span>
            </div>
          </div>
          
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden pt-3 p-1">
            <Command.Empty className="py-6 text-center text-sm text-zinc-500">
              {isLoading ? "Searching..." : "No results found."}
            </Command.Empty>

            {searchResults && searchResults.length > 0 && (
              <>
                <Command.Group heading="Events" className="text-xs font-semibold text-zinc-500 pb-2 pt-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-zinc-500">
                  {searchResults.map((event) => (
                    <Command.Item
                      key={event.id}
                      onSelect={() => runCommand(() => router.push(`/feed#event-${event.id}`))}
                      className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-zinc-200 outline-none hover:bg-zinc-800 hover:text-white"
                    >
                      <CalendarIcon className="mr-3 h-4 w-4 text-zinc-400" />
                      <div className="flex flex-col">
                        <span>{event.title}</span>
                        <span className="text-xs text-zinc-500 truncate max-w-[200px]">{event.description}</span>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
                <div className="my-1 h-[1px] bg-zinc-800" />
              </>
            )}

            <Command.Group heading="Navigation" className="text-xs font-semibold text-zinc-500 pb-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:text-zinc-500">
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/feed"))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-zinc-200 outline-none hover:bg-zinc-800 hover:text-white"
              >
                <Home className="mr-3 h-4 w-4 text-zinc-400" />
                <span>Home Feed</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/discover"))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-zinc-200 outline-none hover:bg-zinc-800 hover:text-white"
              >
                <Compass className="mr-3 h-4 w-4 text-zinc-400" />
                <span>Discover</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/events/upcoming"))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-zinc-200 outline-none hover:bg-zinc-800 hover:text-white"
              >
                <CalendarIcon className="mr-3 h-4 w-4 text-zinc-400" />
                <span>My Events</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push("/profile"))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-zinc-200 outline-none hover:bg-zinc-800 hover:text-white"
              >
                <User className="mr-3 h-4 w-4 text-zinc-400" />
                <span>Profile</span>
              </Command.Item>
            </Command.Group>

            <div className="my-1 h-[1px] bg-zinc-800" />

            <Command.Group heading="Account" className="text-xs font-semibold text-zinc-500 pb-1 pt-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-zinc-500">
              <Command.Item 
                onSelect={() => runCommand(() => signOut({ callbackUrl: "/" }))}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-zinc-200 outline-none hover:bg-zinc-800 text-red-400 hover:text-red-300"
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span>Log out</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </Command.Dialog>
  );
}