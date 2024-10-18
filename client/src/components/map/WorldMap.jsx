import "./WorldMap.css"

export const WorldMap =  () => {

  return (
    <>
<button
  style={{
    marginLeft: '55rem',
    marginBottom: '1rem',
    padding: '1rem 2rem', // Increase padding for a larger button
    fontSize: '1.2rem', // Increase font size
    borderRadius: '8px', // Round the corners
    backgroundColor: '#28a745', // You can choose a unique color
    color: '#ffffff', // White text
    border: 'none', // Remove default border
    cursor: 'pointer', // Pointer cursor on hover
    transition: 'background-color 0.3s, transform 0.3s' // Add transition for hover effect
  }}
  className="btn"
  type="button"
  disabled
>
  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Loading...</span>
</button>


<h1 style={{marginLeft:'20rem'}}>Please Stay Tuned For Our Next Wonderful Adventure! Thank you!</h1>
</>
  )
}