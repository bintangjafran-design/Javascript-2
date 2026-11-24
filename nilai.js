
// =============================================================
// nilai.js - LOGIKA hitung nilai, berjalan di BROWSER
// =============================================================

function hitungNilaiAkhir(tugas, uts, uas) {
  // Bobot standar: 30% Tugas, 30% UTS, 40% UAS (dibulatkan 2 desimal)
  const hasil = (tugas * 0.3) + (uts * 0.3) + (uas * 0.4);
  return Number(hasil.toFixed(2));
}

function tentukanGrade(nilai) {
  // Mengacu pada komentar uji: tentukanGrade(84.9) -> 'B' (berarti A >= 85)
  if (nilai >= 85) return 'A';
  if (nilai >= 70) return 'B';
  if (nilai >= 55) return 'C';
  if (nilai >= 40) return 'D';
  return 'E';
}

function buatRekap(daftar) {
  return daftar.map((m) => {
    const nilaiAkhir = hitungNilaiAkhir(m.tugas, m.uts, m.uas);
    const grade = tentukanGrade(nilaiAkhir);
    const lulus = nilaiAkhir >= 55; // Lulus jika minimal nilai C (>= 55)
    return {
      ...m,
      nilaiAkhir,
      grade,
      lulus,
    };
  });
}

function hitungRataRata(rekap) {
  if (rekap.length === 0) return 0;
  const total = rekap.reduce((acc, m) => acc + m.nilaiAkhir, 0);
  return Number((total / rekap.length).toFixed(2));
}

function cariTertinggi(rekap) {
  if (rekap.length === 0) return null;
  return rekap.reduce((tertinggi, m) =>
    m.nilaiAkhir > tertinggi.nilaiAkhir ? m : tertinggi
  );
}

function hitungDistribusiGrade(rekap) {
  const distribusi = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  for (const m of rekap) {
    if (distribusi[m.grade] !== undefined) {
      distribusi[m.grade]++;
    }
  }
  return distribusi;
}

function cariMahasiswa(rekap, kataKunci) {
  const kunci = kataKunci.trim().toLowerCase();
  if (!kunci) return rekap;
  return rekap.filter(
    (m) =>
      m.nama.toLowerCase().includes(kunci) ||
      m.nim.toLowerCase().includes(kunci)
  );
}

// ---- Sudah jadi: validasi input mahasiswa baru (dipakai sebelum memanggil api.js) ----
function validasiMahasiswa(input) {
  const errors = [];
  if (typeof input.nim !== 'string' || !/^\d{7}$/.test(input.nim)) {
    errors.push('NIM harus 7 digit angka');
  }
  if (typeof input.nama !== 'string' || input.nama.trim().length < 3) {
    errors.push('Nama minimal 3 karakter');
  }
  for (const kolom of ['tugas', 'uts', 'uas']) {
    const n = input[kolom];
    if (typeof n !== 'number' || !Number.isFinite(n) || n < 0 || n > 100) {
      errors.push(`Nilai ${kolom} harus angka 0-100`);
    }
  }
  return errors;
}