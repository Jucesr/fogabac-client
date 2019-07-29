import React from 'react'
import {connect} from 'react-redux'
import { Image, Label, Input, Menu, Button, Icon, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Header = (props) => {
  const activeItem = 'Apoyos'
  return (
    <div>
      <div className="Header_User">
        <div>
          <Image src='/img/logo_xs.jpg' />
        </div>
        <div>
        <Popup 
          hoverable 
          trigger={
          <div className="Header_UserInfo">
            <Image size='mini' src={`/img/user.png`} avatar/>
            <div>
              <div>
                Julio Ojeda
              </div>
              <span>
                Analista
              </span>
            </div>
          </div>
          
          } 
          position='bottom right' 
          content={
            <div
            >
              <Button onClick={() => alert('No implementado')} color="red"><Icon name="log out" />Cerrar sesión</Button>
            </div>
          }
        />
        </div>
      </div>

      <div>
      <Menu pointing>
          <Menu.Item name="pendientes" as={Link} to="/pendientes" active={activeItem === 'Pendientes'} />

          <Menu.Item name="apoyos" as={Link} to="/apoyos" active={activeItem === 'Apoyos'}/>
            
          <Menu.Item name="solicitantes" as={Link} to="/solicitantes" active={activeItem === 'Solicitantes'} />

          <Menu.Item
            name='Notificaciones'
            active={activeItem === 'Notificaciones'}
          />
          <Menu.Item
            name='Reportes'
            active={activeItem === 'Reportes'}
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
     payload: page_title
   })
  }
 });
 
 const mapStateToProps = (state) => ({
 });

export default connect(mapStateToProps, mapDispatchToProps)(Header)