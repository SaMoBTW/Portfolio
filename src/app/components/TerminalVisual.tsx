export function TerminalVisual({ className = "" }: { className?: string }) {
  return (
    <div 
      className={`relative w-full rounded-md overflow-hidden border border-primary/30 bg-[#0a0a1a] ${className}`}
      style={{
        aspectRatio: '16/9',
      }}
    >
      {/* Linux-style Terminal Header */}
      <div className="bg-[#1a1a2e] border-b border-primary/20 px-3 md:px-4 py-1.5 md:py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-[9px] md:text-[10px] font-mono">samir@homeserver:~/media-server</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 md:w-3.5 h-2.5 md:h-3.5 flex items-center justify-center hover:bg-gray-700 rounded transition-colors cursor-pointer">
            <span className="text-gray-400 text-[10px] md:text-xs">−</span>
          </div>
          <div className="w-2.5 md:w-3.5 h-2.5 md:h-3.5 flex items-center justify-center hover:bg-gray-700 rounded transition-colors cursor-pointer">
            <span className="text-gray-400 text-[10px] md:text-xs">□</span>
          </div>
          <div className="w-2.5 md:w-3.5 h-2.5 md:h-3.5 flex items-center justify-center hover:bg-red-600 rounded transition-colors cursor-pointer group-hover:text-white">
            <span className="text-gray-400 hover:text-white text-[10px] md:text-xs">×</span>
          </div>
        </div>
      </div>

      {/* Terminal Dashboard Content */}
      <div className="absolute inset-0 pt-8 md:pt-10 p-3 md:p-6 font-mono text-[9px] md:text-xs overflow-hidden">
        {/* System Stats Grid */}
        <div className="grid grid-cols-3 gap-1.5 md:gap-2 mb-3 md:mb-4 text-[8px] md:text-[10px]">
          <div className="border border-primary/30 rounded p-1.5 md:p-2 bg-primary/5">
            <div className="text-primary/60 mb-0.5 md:mb-1">CPU</div>
            <div className="text-primary text-[10px] md:text-sm font-bold">Ryzen™ 9</div>
            <div className="text-primary/70 text-[7px] md:text-[9px]">7940HS</div>
            <div className="text-primary/40 mt-0.5 text-[6px] md:text-[8px] hidden md:block">⣿⣿⣿⣿⣿⣀⣀⣀⣀⣀</div>
          </div>
          <div className="border border-primary/30 rounded p-1.5 md:p-2 bg-primary/5">
            <div className="text-primary/60 mb-0.5 md:mb-1">MEM</div>
            <div className="text-primary text-xs md:text-lg font-bold">16GB</div>
            <div className="text-primary/40 mt-0.5 text-[6px] md:text-[8px] hidden md:block">⣿⣿⣿⣿⣿⣿⣿⣀⣀⣀</div>
          </div>
          <div className="border border-primary/30 rounded p-1.5 md:p-2 bg-primary/5">
            <div className="text-primary/60 mb-0.5 md:mb-1">GPU</div>
            <div className="text-primary text-[10px] md:text-sm font-bold">RTX 4060</div>
            <div className="text-primary/40 mt-0.5 text-[6px] md:text-[8px] hidden md:block">⣿⣿⣿⣿⣿⣿⣀⣀⣀⣀</div>
          </div>
        </div>

        {/* Service Status */}
        <div className="space-y-1 md:space-y-1.5 text-[8px] md:text-[10px] mb-3 md:mb-4">
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="text-[#28c840]">●</span>
            <span className="text-gray-400">plex</span>
            <span className="text-primary/40 hidden md:inline">running</span>
            <span className="ml-auto text-primary/60">23d 17h</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="text-[#28c840]">●</span>
            <span className="text-gray-400">cloudflared</span>
            <span className="text-primary/40 hidden md:inline">running</span>
            <span className="ml-auto text-primary/60">8d 2h</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="text-[#28c840]">●</span>
            <span className="text-gray-400">overseerr</span>
            <span className="text-primary/40 hidden md:inline">running</span>
            <span className="ml-auto text-primary/60">41d 9h</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="text-[#28c840]">●</span>
            <span className="text-gray-400">cli_debrid</span>
            <span className="text-primary/40 hidden md:inline">running</span>
            <span className="ml-auto text-primary/60">12d 23h</span>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="text-[7px] md:text-[9px] text-primary/30 space-y-0.5 md:space-y-1">
          <div>[2026-04-06 14:23:15] New media added</div>
          <div>[2026-04-06 14:18:42] Transcoding completed</div>
          <div>[2026-04-06 14:12:08] Remote access</div>
        </div>
      </div>
    </div>
  );
}
