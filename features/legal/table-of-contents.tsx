import Link from "next/link";

export default function TableOfContents() {
  const content = [
    {
      id: "1",
      title: "Privacy Policy",
      href: "/legal#privacy",
    },
    {
      id: "2",
      title: "Terms and Conditions",
      href: "/legal#terms",
    },
    {
      id: "3",
      title: "About Us",
      href: "/legal#about",
    },
    {
      id: "4",
      title: "Contact Us",
      href: "/legal#contact",
    },
    {
      id: "5",
      title: "Support",
      href: "/legal#support",
    }
  ]
  return (
    <div className="w-full sticky top-20">
      <h1 className="text-2xl font-bold tracking-tighter mb-10">Table of contents</h1>
      {content.map((item, idx) => (
        <Link href={item.href} className="flex mb-3" key={idx}>
          <span className="text-xl tracking-tighter pe-2">{idx + 1}</span>
          <p className="capitalize underline text-xl tracking-tighter">
            {item.title}
          </p>
        </Link>
      ))}
    </div>
  )
}
