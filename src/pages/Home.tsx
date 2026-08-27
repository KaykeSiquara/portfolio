import { CaseTeaser } from '../sections/CaseTeaser'
import { Hero } from '../sections/Hero'
import { ProofLine } from '../sections/ProofLine'
import { Projects } from '../sections/Projects'

export function Home() {
  return (
    <>
      <Hero />
      <ProofLine />
      <CaseTeaser />
      <Projects />
    </>
  )
}
