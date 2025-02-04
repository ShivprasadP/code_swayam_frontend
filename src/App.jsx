import 'react';
import Header from "./component/Header"
//import Contactus from "./component/contactus"
// import Aboutus from "./component/aboutus"
// import Home from './component/home';
// import Footer from "./component/footer"
// import Practice from "./component/Practice/Practice"
// import EventRouting from "./component/Events/EventRouting"
import Ranking from "./component/Ranking/Ranking"
import ranks from './component/Ranking/ranks';
const App = () => {
	return (
		<div className='bg-white'>
			<Header />
			{/* <Home />
      		<Aboutus />
			<Footer/>  */}
			<Ranking events={ranks} /> 
			{/* <Practice/> */}
		</div>
	)
}

export default App
