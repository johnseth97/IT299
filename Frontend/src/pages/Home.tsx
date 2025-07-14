// src/pages/Home.tsx
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-blue-700">
          Picture This:{' '}
        </h1>
        <p className="text-xl text-gray-700">
          Your one-stop shop for photo printing, digital edits, and film
          recovery. It's not a dream, it's your memories brought to life!
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link to="/services">
            <Button size="lg">Browse Services</Button>
          </Link>
          <Link to="/orders">
            <Button variant="outline" size="lg">
              Track Your Orders
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">
            🌉 Stunning Prints
          </h2>
          <p className="text-gray-600">
            From wallet-size to full poster prints, we offer professional-grade
            printing on premium photo paper. Capture your favorite memories in
            perfect clarity.
          </p>
          <img
            src="/img/print-example.jpg"
            alt="Example print"
            className="w-full rounded shadow-md"
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">
            🖼️ Digital Photo Editing
          </h2>
          <p className="text-gray-600">
            Need a quick touch-up or a creative composition change? Our skilled
            editors bring your photos to life with expert-level precision and
            care.
          </p>
          <img
            src="/img/edit-example.jpg"
            alt="Photo editing example"
            className="w-full rounded shadow-md"
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">🎞️ Film Services</h2>
          <p className="text-gray-600">
            We specialize in film negative development and photograph recovery.
            Send us your physical media, and we’ll bring the past into the
            digital age.
          </p>
          <img
            src="/img/film-example.jpg"
            alt="Film development"
            className="w-full rounded shadow-md"
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">
            🚚 Fast & Secure Orders
          </h2>
          <p className="text-gray-600">
            Place your order in minutes and track it with ease. Your memories
            are safe with us, and your satisfaction is our top priority.
          </p>
          <img
            src="/img/order-example.jpg"
            alt="Order process"
            className="w-full rounded shadow-md"
          />
        </div>
      </section>
    </div>
  )
}
