import Text from "@/components/text";

export default function Title() {
  return (
    <main className="w-full bg-grid py-20 pb-10 border-b">
      <div className="container mx-auto">
        <div className="w-full text-center py-20">
          <Text className="text-6xl sm:text-7xl font-bold tracking-tighter">More Information</Text>
          <Text type="sub">Updated Saturday 24th Febuary 2024</Text>
        </div>
      </div>
    </main>
  )
}

