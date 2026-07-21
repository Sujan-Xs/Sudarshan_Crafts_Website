import React from 'react';

export default function About() {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-bg relative">
      <div className="max-w-[1200px] mx-auto">

        {/* Section Header */}
        <div id="about" className="text-center mb-20">
          <div className="inline-flex items-center justify-center space-x-2 text-[10px] tracking-[0.25em] text-brand-bronze uppercase mb-4">
            <span className="w-1 h-1 rounded-full bg-brand-bronze" />
            <span>Our Institutions</span>
            <span className="w-1 h-1 rounded-full bg-brand-bronze" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-brand-charcoal">
            About the Foundations
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Crafts Museum */}
          <div
            className="flex flex-col space-y-8"
          >
            <div className="border-b border-brand-bronze/20 pb-4">
              <h3 className="text-2xl font-serif font-medium text-brand-charcoal">Sudarshan Crafts Museum</h3>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-brand-bronze mb-2">Established</h4>
                <p className="text-sm text-brand-grey font-light leading-relaxed">
                  After Completing the decoration of Atami Stupa in Japan Shri Sudarshan Sahoo come back to Puri and established the Sudarshan Crafts Museum in the year 1977 at Station Road, Puri, Odisha, a coastal town in Eastern India.
                </p>
              </div>

              <div>
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-brand-bronze mb-2">Concept</h4>
                <p className="text-sm text-brand-grey font-light leading-relaxed">
                  For a long time Shri Sahoo, a nontraditional artist, had been practicing the art of traditional sculptures in the medium of stone and wood at his ancestral home in Kumuti Sahi, Puri town. After visiting all over India and abroad with relation to his art he thought of institutionalizing the set up so that a proper workshop, showroom along with facilities for artists will be created so that tourists and dignitaries can see and feel the inheritance and continuous development of traditional sculptures. Art lovers and connoisseurs will have the opportunity to see various forms of sculptures along with the evolution process. Some big projects can be undertaken at this center. Non-traditional pupil having aptitude for art to be encouraged to pursue this field as a profession.
                </p>
              </div>

              <div>
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-brand-bronze mb-2">Activities</h4>
                <p className="text-sm text-brand-grey font-light leading-relaxed">
                  Along with some of his contemporary artists and assistants he started the center in the year 1977 which was a new and unique concept at that time. This center in the past has developed many sculptures from non-traditional families which helped the conservative artistic society to do better work. Side by side, training, residential facilities, a Buddhist temple in Japanese style, library, showroom and workshop were added to facilitate the visitors and artists. For a long time it is exporting the handicrafts to foreign countries and has been recognized by the Government. Art lovers and visitors from all over the world have appreciated this Endeavour.
                </p>
              </div>
            </div>
          </div>

          {/* Arts and Crafts Village */}
          <div
            className="flex flex-col space-y-8"
          >
            <div className="border-b border-brand-bronze/20 pb-4">
              <h3 className="text-2xl font-serif font-medium text-brand-charcoal">Sudarshan Arts and Crafts Village</h3>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-brand-bronze mb-2">Established</h4>
                <p className="text-sm text-brand-grey font-light leading-relaxed">
                  Established in 1991 with concessional rate, the Government of Odisha had provided the land for the establishment of Sudarshan Art & Crafts Village with the principle of Gurukul system of learning.
                </p>
              </div>

              <div>
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-brand-bronze mb-2">Concept</h4>
                <p className="text-sm text-brand-grey font-light leading-relaxed">
                  After running an institution named Sudarshan Crafts Museum at Puri for the last 20 year, Shri Sudarshan Sahoo decided to establish a center in Bhubaneswar. A training and Production Center on the pattern of a Gurukul system where master craftsmen, artists, assistants and students will reside and purse the traditional art and sculpture that include training, skill development of existing artists, production and sale of art objects. Facilities like workshop, hostel with boarding facility, library, seminar room, tool room, permanent art gallery, and showroom will be created as a full and self-sufficient unit.
                </p>
              </div>

              <div>
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-brand-bronze mb-2">Activities</h4>
                <p className="text-sm text-brand-grey font-light leading-relaxed">
                  Started in the year 1992 with the assistance from the Development Commissioner Handicrafts, Govt. Of India, The training programs are progressing from time to time as well as private training where pupil of all caste, creed and handicapped persons are encouraged to participate. The crafts village provides free boarding and lodging to all the trainee and artists. Now this is training-cum-production center of traditional sculptures of stone, wood and fiber glass, which will add other crafts as and when facilities develop. The permanent hostel, kitchen and library are in progress. In the existing facility 70 students, artists and assistants are residing which will be increased in the future.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
