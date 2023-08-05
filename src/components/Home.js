import React from 'react'

function Home({ isLogin }) {
    // console.log("loginstatus ", isLogin);
    return (
        <div className='container d-flex justify-content-center align-items-center' id='HomeContainer'>
            <div className='d-flex flex-column align-items-center'>
                {isLogin ? (<div className='col text-center'>
                    Prieve
                </div>) : (
                    <div className="row">
                        Home
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
