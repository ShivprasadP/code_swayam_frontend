import 'react';
import Header from "./component/Header"
import Contactus from "./component/contactus"
import Aboutus from "./component/aboutus"
import Home from './component/home';
import Footer from "./component/footer"
const App = () => {
	return (
		<div className='bg-white'>
			<Header />
			<Home />
			<Contactus />
      		<Aboutus />
			<Footer/>
		</div>
	)
}

export default App
