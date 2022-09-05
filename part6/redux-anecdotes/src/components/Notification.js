import { useSelector } from "react-redux"

const Notification = () => {
  let notification = useSelector(state => state.notification)
  
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    notification.notification &&
    <div style={style}>
      {notification.notification}
    </div>
  )
}

export default Notification