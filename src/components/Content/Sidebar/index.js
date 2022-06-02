import React from 'react'
import ReactDOM from 'react-dom'
import { slide as Menu } from 'react-burger-menu';
import useContentController from '../useContentController';
import useSidebar from './useSidebar';

function SettingsController({props}) {
  const { sidebarInfo } = props
  const { content } = useContentController()
  const { getSettings } = useSidebar() 

    return (
      <Menu right>
        <div>
           
        </div>
      </Menu>
    );
  };
  

export default function SidebarController(props) {

  return (
    <div id="email-content-settings-controller">
      { ReactDOM.createPortal(
          <SettingsController props = {props}/>, 
        document.querySelector("#modals")) 
      } 
    </div>
  )
}
