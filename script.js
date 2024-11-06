function hitungUmur() {
    const nama = document.getElementById('nama').value.trim();
    const tanggalStr = document.getElementById('tanggal').value.trim();

    if (!nama || !tanggalStr) {
        alert('Harap masukkan nama dan tanggal lahir.');
        return;
    }

    const tanggalLahir = new Date(tanggalStr.split('-').reverse().join('-'));
    const tanggalSaatIni = new Date();
    
    if (isNaN(tanggalLahir.getTime()) || tanggalLahir >= tanggalSaatIni || tanggalLahir >= new Date(tanggalSaatIni.getTime() - 24*60*60*1000)) {
        alert('invalid input.');
        return;
    }

    const tahun = tanggalSaatIni.getFullYear() - tanggalLahir.getFullYear();
    const bulan = tanggalSaatIni.getMonth() - tanggalLahir.getMonth();
    const hari = tanggalSaatIni.getDate() - tanggalLahir.getDate();
    
    let resultTahun = tahun;
    let resultBulan = bulan;
    let resultHari = hari;

    if (hari < 0) {
        resultHari += new Date(tanggalSaatIni.getFullYear(), tanggalSaatIni.getMonth(), 0).getDate();
        resultBulan--;
    }
    if (resultBulan < 0) {
        resultBulan += 12;
        resultTahun--;
    }

    const output = `${nama}: umur Anda adalah ${resultTahun} tahun ${resultBulan} bulan ${resultHari} hari.`;
    document.getElementById('hasil').innerText = output;
    
    const filePath = path.join(__dirname, 'hasil_perhitungan_umur_rinci.txt');
    console.log('Menyimpan ke file:', filePath);

    fetch('/saveResult', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ result: output }),
    }).then(response => {
        if (response.ok) {
            console.log('Hasil berhasil disimpan.');
        } else {
            console.error('Gagal menyimpan hasil.');
        }
    });
}

function resetForm() {
    document.getElementById('nama').value = '';
    document.getElementById('tanggal').value = '';
    document.getElementById('hasil').innerText = '';
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        window.location.reload();
    }
});
