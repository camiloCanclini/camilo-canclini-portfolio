import './MenuBtn.css'

export default function MenuBtn() {
  return (
    <div className=''>
      <input type="checkbox" id="checkbox" />
      <label htmlFor="checkbox" className="toggle">
        <div className="bar bar--top"></div>
        <div className="bar bar--middle"></div>
        <div className="bar bar--bottom"></div>
      </label>
    </div>
  )
}