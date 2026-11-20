export const socialLinks = [
  {
    name: "Facebook",
    label: "Orbit Agrochemical Industries Ltd",
    url: "https://www.facebook.com/p/Orbit-Agrochemical-industries-ltd-100069240842491/",
    image: "/facebook-vector-social-media-icon_1073073-2139-removebg-preview.png",
  },
  {
    name: "TikTok",
    label: "@orbitagrochemicals",
    url: "https://www.tiktok.com/@orbitagrochemicals",
    image: "/tiktok.png",
  },
  {
    name: "WhatsApp",
    label: "+254 752 368 468",
    url: "https://api.whatsapp.com/send?phone=254752368468",
    image: "/WhatsApp.png.webp",
  },
];

export function SocialLogo({ name }: { name: string }) {
  const social = socialLinks.find((item) => item.name === name);
  if (!social) return null;
  return <img src={social.image} alt={social.name} className="h-5 w-5 shrink-0 object-contain" />;
}

export function SocialLinks({
  className = "",
  showLabels = false,
}: {
  className?: string;
  showLabels?: boolean;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className={
            showLabels
              ? "inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 shadow-xs transition hover:border-gray-300 hover:bg-gray-50"
              : "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-xs transition hover:border-gray-300 hover:bg-gray-50"
          }
        >
          <SocialLogo name={social.name} />
          {showLabels && <span>{social.label}</span>}
        </a>
      ))}
    </div>
  );
}
