import '../styles/App.scss';
import contactList from '../data/contacts.json';
import { useState } from 'react';

function App() {
  //variables de estado
  const [data, setData] = useState(contactList);
  const [search, setSearch] = useState('');
  const [newContact, setNewContact] = useState({
    name: '',
    lastname: '',
    phone: '',
    email: '',
  });

  const handleSearch = (ev) => {
    setSearch(ev.target.value);
  };
  const handleNewContact = (ev) => {
    setNewContact({
      ...newContact,
      [ev.target.id]: ev.target.value,
    });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setData([...data, newContact]);
    setNewContact({
      name: '',
      lastname: '',
      phone: '',
      email: '',
    });
  };

  const htmlData = data
    .filter(
      (contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.lastname.toLowerCase().includes(search.toLowerCase())
    )
    .map((contact, i) => {
      return (
        <li className="contact__item" key={i}>
          <p className="contact__name">
            <label className="contact__label">Name:</label>
            {contact.name} {contact.lastname}
          </p>
          <p className="contact__phone">
            <label className="contact__label">Phone:</label>
            <a
              href={`tel:${contact.phone}`}
              title="Pulsa aquí para llamar a Lola"
            >
              {contact.phone}
            </a>
          </p>
          <p className="contact__mail">
            <label className="contact__label">Email:</label>

            <a
              href="mailto:lmartinez@adalab.es"
              title="Pulsa aquí para escribir a Lola"
            >
              {contact.email}
            </a>
          </p>
        </li>
      );
    });
  return (
    <div className="page">
      {/* header */}
      <header className="header">
        <h1 className="header__title">My contact list</h1>
        <form>
          <input
            className="header__search"
            autoComplete="off"
            type="search"
            name="search"
            placeholder="Filter contacts by name"
            onChange={handleSearch}
            value={search}
          />
        </form>
      </header>

      <main>
        {/* contact list */}
        <ul className="contact__list">{htmlData}</ul>

        {/* new contact */}
        <form className="new-contact__form">
          <h2 className="new-contact__title">Add a new contact</h2>
          <input
            className="new-contact__input"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={handleNewContact}
            value={newContact.name}
          />
          <input
            className="new-contact__input"
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last Name"
            onChange={handleNewContact}
            value={newContact.lastname}
          />
          <input
            className="new-contact__input"
            type="phone"
            name="phone"
            id="phone"
            placeholder="Phone"
            onChange={handleNewContact}
            value={newContact.phone}
          />
          <input
            className="new-contact__input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleNewContact}
            value={newContact.email}
          />
          <input
            className="new-contact__btn"
            type="submit"
            value="Submit"
            onClick={handleClick}
          />
        </form>
      </main>
    </div>
  );
}

export default App;
