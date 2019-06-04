import React from 'react'
import { Header } from 'semantic-ui-react'


const Page = (props) => {
  return (
    <div>
      <div className="Page_title">
      <Header as='h3'>{props.title}</Header>
      </div>
      <div className="Page_body">
        {props.children}
      </div>
      

    </div>
  )
}

Page.propTypes = {

}

export default Page