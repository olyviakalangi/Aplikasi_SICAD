import { View, Text, ScrollView } from "react-native";
import React from "react";
import tw from "../../../lib/tailwind";

export default function SyaratKtp() {
  return (
    <ScrollView style={[tw`px-5`]} showsVerticalScrollIndicator={false}>
      <Text style={[tw`pt-5 pb-2 text-primary font-bold text-lg`]}>
        Syarat & Ketentuan Umum:
      </Text>
      <Text style={[tw`pl-2`]}>1. Berusia minimal 17 tahun.</Text>
      <Text style={[tw`pl-2`]}>2. Memiliki Kartu Keluarga (KK).</Text>
      <Text style={[tw`pt-5 pb-2 text-primary font-bold text-lg`]}>
        Syarat & Ketentuan Umum:
      </Text>
      <Text style={[tw`p-2 text-justify`]}>
        1. Jika KTP Hilang/Rusak, memiliki bukti foto KTP yang rusak (Jika
        Rusak) dan Surat keterangan hilang dari kepolisian (jika hilang).
      </Text>
      <Text style={[tw`p-2 text-justify`]}>
        2. Jika Anda bukan asli warga setempat dan Warga Negara Indonesia (WNI),
        wajib memiliki surat keterangan pindah dari kota asal.
      </Text>
      <Text style={[tw`p-2 text-justify`]}>
        3. Bagi WNI yang datang dari luar negeri karena pindah, wajib memiliki
        surat keterangan pindah dari Disdukcapil Kabupaten/Kota Asal.
      </Text>
      <Text style={[tw`p-2 text-justify`]}>
        4. Bagi Warga Negara Asing (WNA), wajib memiliki dokumen perjalanan, dan
        kartu izin tinggal tetap (KITAP).
      </Text>
    </ScrollView>
  );
}
