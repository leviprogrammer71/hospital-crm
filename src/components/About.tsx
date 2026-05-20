import React from 'react';
import { Quote, Star } from 'lucide-react';

const About = () => {
  const testimonials = [
    {
      quote: "CuraOS has transformed our hospital operations. We've saved over 5 hours of administrative work weekly, allowing our staff to focus more on patient care.",
      author: "Dr. Amira Nguvu",
      role: "Chief Medical Officer",
      hospital: "Central City Hospital"
    },
    {
      quote: "The intuitive interface and comprehensive features have made managing our clinic staff and patient records incredibly efficient. Highly recommend!",
      author: "Maria Rodriguez",
      role: "Hospital Administrator",
      hospital: "Riverside Medical Center"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#11698E] mb-6">
              Why CuraOS Exists
            </h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Hospitals and clinics worldwide struggle with outdated systems, manual processes, 
                and paper-based record keeping. These inefficiencies lead to miscommunication, 
                lost time, and ultimately impact patient care quality.
              </p>
              <p>
                CuraOS was built to solve these critical problems by providing a unified, 
                digital platform that connects all aspects of hospital administration. From 
                patient records to staff scheduling, everything is centralized and accessible.
              </p>
              <p>
                Our mission is to help healthcare professionals spend less time on paperwork 
                and more time caring for patients, while ensuring hospital operations run 
                smoothly and efficiently.
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-start">
                  <Quote className="h-8 w-8 text-[#11698E] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 mb-4 italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#11698E]">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                        <p className="text-sm text-gray-500">{testimonial.hospital}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-[#5CDB95] fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;