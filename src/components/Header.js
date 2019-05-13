import React from 'react'
import {connect} from 'react-redux'
import { Label, Input, Menu, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const handleItemClick = () => {
}

const Header = (props) => {
  const activeItem = 'Apoyos'
  return (
    <div>
      <div className="Header_User">
        <div className ="Header_UserInfo">
          <Label color='blue'>Analista 
            <Label.Detail>Julio Ojeda</Label.Detail>
          </Label>
        </div>
        <div>
          <Button color="red">
            <Icon name='log out' />
            Cerrar Sesión
        </Button>
        </div>
      </div>

      <div>
      <Menu pointing>
          <Menu.Item 
            active={activeItem === 'Pendientes'} 
            onClick={handleItemClick}
          >
            <Link to="/pendientes">Pendientes</Link>
          </Menu.Item >

          <Menu.Item 
            active={activeItem === 'Apoyos'} 
            
          >
            <Link to="/apoyos">Apoyos</Link>
          </Menu.Item >

          <Menu.Item
            name='Notificaciones'
            active={activeItem === 'Notificaciones'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='Reportes'
            active={activeItem === 'Reportes'}
            onClick={handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Buscar...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    </div>

  )
}

const mapDispatchToProps = (dispatch) => ({
  
  changePage: ({page_title, page_active}) => {
   dispatch({
     type: 'CHANGE_PAGE',
     payload: {page_title}
   })
  }
 });
 
 const mapStateToProps = (state) => ({
 });

export default connect(mapStateToProps, mapDispatchToProps)(Header)