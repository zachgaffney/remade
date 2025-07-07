import { useState } from 'react';

function ReceiptSplitter() {
  const [receiptItems, setReceiptItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    assignedTo: ''
  });
  const [people, setPeople] = useState(['', 'All']);

  const addPerson = () => {
    setPeople([...people, '']);
  };

  const updatePerson = (index, name) => {
    const updatedPeople = [...people];
    updatedPeople[index] = name;
    setPeople(updatedPeople);
  };

  const removePerson = (index) => {
    const personToRemove = people[index];
    // Don't allow removing "All" person
    if (personToRemove === 'All') {
      return;
    }
    
    if (people.length > 2) { // Changed from 1 to 2 to account for "All"
      const updatedPeople = people.filter((_, i) => i !== index);
      setPeople(updatedPeople);
    }
  };

  const addItem = () => {
    if (newItem.name && newItem.price && newItem.assignedTo) {
      setReceiptItems([...receiptItems, { ...newItem, id: Date.now() }]);
      setNewItem({ name: '', price: '', assignedTo: '' });
    }
  };

  const removeItem = (id) => {
    setReceiptItems(receiptItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return receiptItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);
  };

  const calculatePersonTotal = (person) => {
    const directTotal = receiptItems
      .filter(item => item.assignedTo === person)
      .reduce((sum, item) => sum + parseFloat(item.price), 0);
    
    // Don't add shared costs to "All" person
    if (person === 'All') {
      return directTotal.toFixed(2);
    }
    
    // Calculate shared costs for individual people
    const sharedCosts = receiptItems
      .filter(item => item.assignedTo === 'All')
      .reduce((sum, item) => sum + parseFloat(item.price), 0);
    
    if (sharedCosts === 0) {
      return directTotal.toFixed(2);
    }
    
    // Calculate individual total (excluding "All" items)
    const individualTotal = receiptItems
      .filter(item => item.assignedTo !== 'All')
      .reduce((sum, item) => sum + parseFloat(item.price), 0);
    
    if (individualTotal === 0) {
      return directTotal.toFixed(2);
    }
    
    // Calculate this person's proportion of shared costs
    const proportion = directTotal / individualTotal;
    const sharedPortion = sharedCosts * proportion;
    
    return (directTotal + sharedPortion).toFixed(2);
  };

  const validPeople = people.filter(person => person.trim() !== '');

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: 'var(--card)',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--border)'
    }}>
      <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--fg)' }}>
        Receipt Split Machine
      </h2>

      {/* People Management */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--fg)' }}>People</h3>
        {people.map((person, index) => {
          const personToRemove = people[index];
          return (
            <div key={index} style={{ display: 'flex', marginBottom: '0.5rem', alignItems: 'center' }}>
              <input
                type="text"
                value={person}
                onChange={(e) => updatePerson(index, e.target.value)}
                placeholder="Enter person's name"
                disabled={person === 'All'}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  marginRight: '0.5rem',
                  backgroundColor: person === 'All' ? '#f8f9fa' : 'var(--bg)',
                  color: person === 'All' ? '#6c757d' : 'var(--fg)',
                  cursor: person === 'All' ? 'not-allowed' : 'text'
                }}
              />
              {people.length > 2 && personToRemove !== 'All' && ( // Changed condition
                <button
                  onClick={() => removePerson(index)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          );
        })}
        <button
          onClick={addPerson}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Person
        </button>
      </div>

      {/* Add Receipt Item */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--fg)' }}>Add Receipt Item</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Item name"
            style={{
              flex: '1 1 200px',
              padding: '0.5rem',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              backgroundColor: 'var(--bg)',
              color: 'var(--fg)'
            }}
          />
          <input
            type="number"
            step="0.01"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            placeholder="Price"
            style={{
              flex: '1 1 100px',
              padding: '0.5rem',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              backgroundColor: 'var(--bg)',
              color: 'var(--fg)'
            }}
          />
          <select
            value={newItem.assignedTo}
            onChange={(e) => setNewItem({ ...newItem, assignedTo: e.target.value })}
            style={{
              flex: '1 1 150px',
              padding: '0.5rem',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              backgroundColor: 'var(--bg)',
              color: 'var(--fg)'
            }}
          >
            <option value="">Assign to...</option>
            {validPeople.map((person, index) => (
              <option key={index} value={person}>{person}</option>
            ))}
          </select>
        </div>
        <button
          onClick={addItem}
          disabled={!newItem.name || !newItem.price || !newItem.assignedTo}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: newItem.name && newItem.price && newItem.assignedTo ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: newItem.name && newItem.price && newItem.assignedTo ? 'pointer' : 'not-allowed'
          }}
        >
          Add Item
        </button>
      </div>

      {/* Receipt Items */}
      {receiptItems.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--fg)' }}>Receipt Items</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg)' }}>
                  <th style={{ padding: '0.5rem', border: '1px solid var(--border)', color: 'var(--fg)' }}>Item</th>
                  <th style={{ padding: '0.5rem', border: '1px solid var(--border)', color: 'var(--fg)' }}>Price</th>
                  <th style={{ padding: '0.5rem', border: '1px solid var(--border)', color: 'var(--fg)' }}>Assigned To</th>
                  <th style={{ padding: '0.5rem', border: '1px solid var(--border)', color: 'var(--fg)' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {receiptItems.map((item) => (
                  <tr key={item.id}>
                    <td style={{ padding: '0.5rem', border: '1px solid var(--border)', color: 'var(--fg)' }}>
                      {item.name}
                    </td>
                    <td style={{ padding: '0.5rem', border: '1px solid var(--border)', color: 'var(--fg)' }}>
                      ${parseFloat(item.price).toFixed(2)}
                    </td>
                    <td style={{ padding: '0.5rem', border: '1px solid var(--border)', color: 'var(--fg)' }}>
                      {item.assignedTo}
                    </td>
                    <td style={{ padding: '0.5rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary */}
      {receiptItems.length > 0 && (
        <div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--fg)' }}>Summary</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {validPeople.filter(person => person !== 'All').map((person) => (
              <div
                key={person}
                style={{
                  backgroundColor: 'var(--bg)',
                  padding: '1rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  minWidth: '150px'
                }}
              >
                <div style={{ fontWeight: 'bold', color: 'var(--fg)' }}>{person}</div>
                <div style={{ fontSize: '1.2rem', color: 'var(--fg)' }}>
                  ${calculatePersonTotal(person)}
                </div>
              </div>
            ))}
            {/* Show "All" costs separately */}
            {validPeople.includes('All') && receiptItems.some(item => item.assignedTo === 'All') && (
              <div
                style={{
                  backgroundColor: '#ffc107',
                  color: '#212529',
                  padding: '1rem',
                  borderRadius: '4px',
                  minWidth: '150px',
                  fontWeight: 'bold'
                }}
              >
                <div>Shared Costs</div>
                <div style={{ fontSize: '1.2rem' }}>${calculatePersonTotal('All')}</div>
              </div>
            )}
            <div
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '1rem',
                borderRadius: '4px',
                minWidth: '150px',
                fontWeight: 'bold'
              }}
            >
              <div>Total Receipt</div>
              <div style={{ fontSize: '1.2rem' }}>${calculateTotal()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReceiptSplitter;