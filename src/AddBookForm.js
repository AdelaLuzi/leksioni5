import React, { useState } from 'react';

const allowedGenres = ['Komedi', 'Fiction', 'Drame', 'Romance', 'Edukativ'];

function AddBookForm() {
  const [formData, setFormData] = useState({
    titulli: '',
    autori: '',
    viti: '',
    zhanri: '',
  });

  const [errors, setErrors] = useState({});
  const currentYear = new Date().getFullYear();

  const validate = () => {
    const newErrors = {};

    // Titulli
    if (!formData.titulli) {
      newErrors.titulli = 'Titulli është i detyrueshëm.';
    } else if (formData.titulli.length > 25) {
      newErrors.titulli = 'Titulli nuk mund të jetë më shumë se 25 karaktere.';
    }

    // Autori
    if (!formData.autori) {
      newErrors.autori = 'Autori është i detyrueshëm.';
    } else {
      const words = formData.autori.trim().split(' ');
      const allCapitalized = words.every(
        word => word[0] === word[0]?.toUpperCase() && word.slice(1) === word.slice(1)?.toLowerCase()
      );
      if (!allCapitalized) {
        newErrors.autori = 'Çdo fjalë në emrin e autorit duhet të fillojë me shkronjë të madhe.';
      }
    }

    // Viti
    if (!formData.viti) {
      newErrors.viti = 'Viti është i detyrueshëm.';
    } else if (parseInt(formData.viti) > currentYear) {
      newErrors.viti = `Viti nuk mund të jetë më i madh se ${currentYear}.`;
    }

    // Zhanri
    if (!formData.zhanri) {
      newErrors.zhanri = 'Zhanri është i detyrueshëm.';
    } else if (!allowedGenres.includes(formData.zhanri)) {
      newErrors.zhanri = `Zhanri duhet të jetë një nga: ${allowedGenres.join(', ')}.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      alert(`Libri u shtua:\nTitulli: ${formData.titulli}\nAutori: ${formData.autori}\nViti: ${formData.viti}\nZhanri: ${formData.zhanri}`);
      setFormData({ titulli: '', autori: '', viti: '', zhanri: '' });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
      <div>
        <label>Titulli:</label><br />
        <input
          type="text"
          name="titulli"
          value={formData.titulli}
          onChange={handleChange}
        />
        {errors.titulli && <p style={{ color: 'red' }}>{errors.titulli}</p>}
      </div>

      <div>
        <label>Autori:</label><br />
        <input
          type="text"
          name="autori"
          value={formData.autori}
          onChange={handleChange}
        />
        {errors.autori && <p style={{ color: 'red' }}>{errors.autori}</p>}
      </div>

      <div>
        <label>Viti:</label><br />
        <input
          type="number"
          name="viti"
          value={formData.viti}
          onChange={handleChange}
        />
        {errors.viti && <p style={{ color: 'red' }}>{errors.viti}</p>}
      </div>

      <div>
        <label>Zhanri:</label><br />
        <input
          type="text"
          name="zhanri"
          value={formData.zhanri}
          onChange={handleChange}
        />
        {errors.zhanri && <p style={{ color: 'red' }}>{errors.zhanri}</p>}
      </div>

      <button type="submit" style={{ marginTop: '1rem' }}>Shto Librin</button>
    </form>
  );
}

export default AddBookForm;
