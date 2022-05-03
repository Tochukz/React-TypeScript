import { useEffect, useState } from 'react';

import emitter  from '../services/event-emitter';

import '../scss/alert-dialog.scss';

export default function AlertDialog() {
  const [message, setMessage] = useState('Error Message'); 
  const [alertType, setAlertType] = useState('info');
  const [isOn, setIsOn] = useState(false);

  const alertTypes: any = {
    error: {
      label: 'Error', 
      alertClass: 'alert-danger',
    },
    warning: {
      lable: 'Warning',  
      alertClass: 'alert-wanring'
    },
    success: {
      label: 'Success',
      alertType: 'alert-success',
    },
    info: {
      label: 'Info',
      alertType: 'alert-info',
    }
  }

  useEffect(() => {
    emitter.on('alert', display)
    return () => {
      emitter.off('alert', display);
    }
  }, [])

  const display = (args: any) => {
    const { type, message, error } = args;
    setMessage(message || 'An error occured');

    switch(type) {
      case 'error': 
        setAlertType(type);
        const msg = error.toString();
        setMessage(msg);
        break;
      case 'warning': 
        setAlertType(type);
        break;
      case 'success': 
        setAlertType(type);
        break;
      case 'info': 
        setAlertType(type);
        break;
      default: 
        throw new Error('Unknown alert type: '+ type); 
    }
    setIsOn(true);
  }

  const dismiss = () => {
    setIsOn(false);
  }

  return (
    <div className={`alert-dialog ${isOn ? '' : 'd-none'}`}>
      <div className={`alert alert-dismissible alert-warning ${alertTypes[alertType].alertClass}`}>
        <p className='close-p'>
          <i className='fa fa-close'  onClick={dismiss}></i>
        </p>        
        <h4 className="alert-heading">{ alertTypes[alertType].label }</h4>
        <p className="mb-0">{ message }</p>
      </div>
    </div>
  );
}
