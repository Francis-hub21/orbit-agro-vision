export const socialLinks = [
  { name: "Facebook", url: "https://facebook.com", image: "/facebook-vector-social-media-icon_1073073-2139-removebg-preview.png" },
  { name: "TikTok", url: "https://tiktok.com", image: "/tiktok.png" },
  { name: "WhatsApp", url: "https://whatsapp.com", image: "/WhatsApp.png.webp" },
];

export function SocialLogo({ name }: { name: string }) {
  const social = socialLinks.find((item) => item.name === name);
  if (!social) return null;
  return <img src={social.image} alt={social.name} className="h-5 w-5 shrink-0 object-contain" />;
}

export function SocialLinks({ className = "" }: { className?: string }) {
  return <div className={`flex items-center gap-2 ${className}`}>
    {socialLinks.map((social) => <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name} title={social.name} className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-card hover:bg-secondary">
      <SocialLogo name={social.name} />
    </a>)}
  </div>;
}