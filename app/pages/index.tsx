import type { NextPage } from 'next';
import Home from './home';

const Index: NextPage = () => <Home />;

export default Index;

/*   How to use components

<Navbar />

<Option text="Difficulty" buttons={['easy', 'medium','hard']}  />

<Question text={getQuestion()} />

<PlayerAnswer name="name"  answer="Lorem ipsum dolor sit amet consectetur
adipisicing elit. Laboriosam, odit dolore. Maiores?" />

<PlayerScore name="name" score={5} />

*/
