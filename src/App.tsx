import { useState, useEffect, ChangeEvent } from 'react';

// Import Components
import { InputText, InputPassword, InputSelect } from './components/Input';
import Button from './components/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface Account {
  label: string;
  type: 'Local' | 'External';
  login: string;
  password: string;
  showPwd: boolean;
}

function App() {
  const [type, setType] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<Account[]>(() => {
    const saved = localStorage.getItem('accounts');
    return saved ? JSON.parse(saved) as Account[] : [];
  });
  const [label, setLabel] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [showPwd, setShowPwd] = useState<boolean>(false);

  const HandleAddAccount = () => {
    const newAccount: Account = {
      label,
      type: 'Local',
      login,
      password: pwd,
      showPwd,
    };

    setAccounts(prev => [...prev, newAccount]);
    setLabel('');
    setLogin('');
    setPwd('');
    setShowPwd(false);
  };

  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  const handleDeleteAccount = (index: number) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      setAccounts(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handlePwdToggle = (index: number) => {
    const newAccounts = [...accounts];
    newAccounts[index].showPwd = !newAccounts[index].showPwd;
    setAccounts(newAccounts);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newAccounts = [...accounts];
    newAccounts[index].password = e.target.value;
    setAccounts(newAccounts);
  };

  return (
    <div className="App container">
      <h1 style={{ display: 'inline-block' }}>Учетные записи</h1>
      <Button className="btn btn-success" onClick={HandleAddAccount}>
        +
      </Button>
      <div className="item-display mt-3">
        {accounts.length > 0 ? accounts.map((account, idx) => (
          <div className="row" key={idx}>
            <div className="col-md-2">
              <InputText
                label="Label"
                className="form-control"
                value={account.label}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const newAccounts = [...accounts];
                  newAccounts[idx].label = e.target.value;
                  setAccounts(newAccounts);
                }}
              />
            </div>
            <div className="col-md-3">
              <InputSelect
                label="Record Type"
                className="form-control"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  const newAccounts = [...accounts];
                  setType(!type);
                  newAccounts[idx].type = e.target.value as 'Local' | 'External';
                  setAccounts(newAccounts);
                }}
                options={['Local', 'External']}
              />
            </div>
            <div className={account.type === 'Local' ? 'col-md-3' : 'col-md-6'}>
              <InputText
                label="Login"
                className="form-control"
                value={account.login}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const newAccounts = [...accounts];
                  newAccounts[idx].login = e.target.value;
                  setAccounts(newAccounts);
                }}
              />
            </div>
            {account.type === 'Local' && (
              <div className="col-md-3">
                <InputPassword
                  label="Password"
                  value={account.password}
                  className="form-control"
                  type={account.showPwd ? 'text' : 'password'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, idx)}
                >
                  <Button
                    className="btn btn-primary mt-3 trash-button icon"
                    style={{
                      zIndex: 100,
                      position: 'absolute',
                      top: '13%',
                      right: '10px',
                    }}
                    onClick={() => handlePwdToggle(idx)}
                  >
                    <FontAwesomeIcon icon={account.showPwd ? faEyeSlash : faEye} />
                  </Button>
                </InputPassword>
              </div>
            )}
            <div className="col-md-1">
              <Button
                style={{ marginTop: '23px' }}
                className="btn btn-danger trash-button"
                onClick={() => handleDeleteAccount(idx)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </div>
        )) : (
          <p>No accounts available.</p>
        )}
      </div>
    </div>
  );
}

export default App;