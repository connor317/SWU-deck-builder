export default function Home() {
    return (
        <>
            <div><h1 style={{"textAlign":"center"}}>Home Page</h1></div>
            <div style={{"textAlign":"center"}}>
                <form action="/search">
                    <input type="text" placeholder="Search.." name="q"/>
                </form>
            </div>
        </>
    )
}