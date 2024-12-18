import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import "./index.css";
import phonebookService from "./services/phonebook";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(persons);
  const [notificationMsg, setNotificationMsg] = useState(null);
  useEffect(() => {
    phonebookService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((item) => item.name === newName)) {
      const existingPerson = persons.find((item) => item.name === newName);

      if (
        confirm(
          newName +
            " is already added to the phonebook, replace the old number with the new one?"
        )
      ) {
        phonebookService
          .update(existingPerson.id, newObject)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? response.data : person
              )
            );
            setNotificationMsg({
              msg: `${newName} is updated with the new number`,
              color: "yellow",
            });
            setTimeout(() => {
              setNotificationMsg(null);
            }, 5000);
          });
      }
    } else {
      phonebookService.create(newObject).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
        setNotificationMsg({
          msg: `${newName} added to the phonebook`,
          color: "green",
        });
        setTimeout(() => {
          setNotificationMsg(null);
        }, 5000);
      });
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const result = persons.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(result);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      phonebookService
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setFilter(filter.filter((person) => person.id !== id));
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setNotificationMsg({
              msg: `Contact has already been deleted from the server.`,
              color: "red",
            });
            setPersons(persons.filter((person) => person.id !== id)); // Update state
            setFilter(filter.filter((person) => person.id !== id));
            setTimeout(() => setNotificationMsg(null), 5000);
          } else {
            console.error("Error deleting the contact", error);
            setNotificationMsg("An unexpected error occurred.");
            setTimeout(() => setNotificationMsg(null), 5000);
          }
        });
    }
  };

  return (
    <div>
      <Notification message={notificationMsg} />
      <h2>Phonebook</h2>
      <Filter
        persons={persons}
        handleSearch={handleSearch}
        filter={filter}
        search={search}
        handleDelete={handleDelete}
      />
      <h1>Add a new</h1>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
