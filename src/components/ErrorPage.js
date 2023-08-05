import React from 'react'

function ErrorPage() {
    return (
        <div className='error-container' style={{ position: "absolute", top: "30%", left: "30%", fontSize: "45px", color: "white" }}>
            <div className='error-content'>
                <h1 style={{
                    fontWeight: "900",
                    justifyContent: "center",
                    display: "flex"
                }}>Error 404</h1>
                <p style={{
                    fontWeight: "900", justifyContent: "center",
                    display: "flex"
                }}>Page Not Found</p>
                <p style={{
                    fontWeight: "500", justifyContent: "center",
                    display: "flex"
                }}>Please Fetch Correct URL!</p>
            </div>
        </div >
    )
}

export default ErrorPage
