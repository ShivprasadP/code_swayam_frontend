import 'react'

const Home = () => {
	return (
		<div id='home' className='flex flex-col 
	gap-6 bg-white ml-[55px] 
	mr-[55px] rounded-lg p-8'>
			<div className='mt-[145px] text-3xl 
	font-semibold text-green-800'>
				Welcome to CodeSwayam!!!!!!!!!!!!
			</div>
			<div className='text-2xl text-indigo-900'>
				Smart Ideas for your
				<div className='italic font-bold mt-2'>
					Designs are Here!
				</div>
			</div>
			<div className='flex gap-28'>
				<div className='text-[18px]'>
					Welcome to <a href="#header">
						<span className='text-cyan-800 
			text-[20px] cursor-pointer
			font-bold underline'>
							Lets Create
						</span>
					</a>, a place where innovation and
					creativity collide! Our creative
					team specialises in creating
					eye-catching visual experiences
					that are customised for your business.
					We bring your ideas to life with
					anything from gorgeous logos and
					modern websites to captivating
					packaging and persuasive marketing
					materials. Allow our creative team to
					take your brand to new heights.
					Come discover the power of outstanding
					design with us now!
				</div>
				<img src="../Images/work.avif"
					className='w-[380px] h-[252px] 
		mr-[80px] rounded-full mt-[-75px] ' />
			</div>
			<div className="flex">
				<button
					className=' border-green-800 text text-xl 
		text-green-800 border-2 p-[8px] 
		pl-[25px] pr-[25px] 
		rounded-md hover:bg-green-800 hover:text-white
		hover:transition-all delay-75'
				>
					Discover More
				</button>
			</div>
		</div>
	)
}

export default Home
