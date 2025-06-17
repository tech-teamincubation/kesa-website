export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About KESA</h2>
          <div className="w-24 h-1 bg-kesa-blue mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              Knowledge Enhancement & Skill Acquisition Program
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              KESA is a leading platform for psychology education, offering sessions and certification courses to
              empower learners. We are committed to providing high-quality educational experiences that bridge the gap
              between theoretical knowledge and practical application.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our comprehensive programs are designed by industry experts and delivered through innovative teaching
              methodologies, ensuring that our participants gain valuable skills and knowledge that can be immediately
              applied in their professional practice.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-kesa-blue mb-2">3+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kesa-purple mb-2">2000+</div>
                <div className="text-gray-600">Participants</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img src="/placeholder.svg?height=500&width=600" alt="KESA Team" className="rounded-lg shadow-xl" />
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-kesa-blue to-kesa-purple text-white p-6 rounded-lg">
              <div className="text-2xl font-bold">43+</div>
              <div className="text-sm">Completed Sessions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
