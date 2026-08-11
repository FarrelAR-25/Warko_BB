"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import {
  useRouter,
} from "next/navigation";

import {
  Trash2,
  Plus,
  ImagePlus,
  Pencil,
  X,
  Save,
} from "lucide-react";

import {
  useAuth,
} from "../../context/auth-context";

import { db } from "../../lib/firebase";

export default function AdminMenuPage() {
  const router = useRouter();

  const { user, loading } =
    useAuth();

  // MENU LIST
  const [menus, setMenus] =
    useState<any[]>([]);

  // FORM
  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("Coffee");

  const [image, setImage] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  // EDIT MODE
  const [editId, setEditId] =
    useState("");

  // AUTH PROTECTION
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  // GET MENU REALTIME
  useEffect(() => {
    const unsubscribe =
      onSnapshot(
        collection(db, "menus"),
        (snapshot) => {
          const data =
            snapshot.docs.map(
              (doc) => ({
                firestoreId:
                  doc.id,
                ...doc.data(),
              })
            );

          setMenus(data);
        }
      );

    return () =>
      unsubscribe();
  }, []);

  // RESET FORM
  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("Coffee");
    setImage("");
    setDescription("");
    setEditId("");
  };

  // ADD / UPDATE MENU
  const handleSubmit =
    async () => {
      if (
        !name ||
        !price ||
        !image
      ) {
        alert(
          "Lengkapi data menu"
        );
        return;
      }

      try {
        // EDIT
        if (editId) {
          await updateDoc(
            doc(
              db,
              "menus",
              editId
            ),
            {
              name,

              price:
                Number(price),

              category,

              image,

              description,
            }
          );

          alert(
            "Menu berhasil diupdate 🚀"
          );
        }

        // ADD
        else {
         await addDoc(
  collection(db, "menus"),
  {
    name,
    price: Number(price),
    category,
    image,
    description,
    soldOut: false,
  }
);

          alert(
            "Menu berhasil ditambahkan 🚀"
          );
        }

        resetForm();
      } catch (error) {
        console.error(error);

        alert(
          "Gagal menyimpan menu"
        );
      }
    };

  // DELETE MENU
  const deleteMenu =
    async (id: string) => {
      const confirmDelete =
        confirm(
          "Hapus menu ini?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteDoc(
          doc(db, "menus", id)
        );

        alert(
          "Menu berhasil dihapus"
        );
      } catch (error) {
        console.error(error);

        alert(
          "Gagal hapus menu"
        );
      }
    };

    // TOGGLE SOLD OUT
const toggleSoldOut = async (
  id: string,
  currentStatus: boolean
) => {
  try {
    await updateDoc(
      doc(db, "menus", id),
      {
        soldOut: !currentStatus,
      }
    );
  } catch (error) {
    console.error(error);
    alert("Gagal mengubah status menu");
  }
};

  // EDIT MENU
  const editMenu = (
    menu: any
  ) => {
    setEditId(
      menu.firestoreId
    );

    setName(menu.name);

    setPrice(
      String(menu.price)
    );

    setCategory(
      menu.category
    );

    setImage(menu.image);

    setDescription(
      menu.description
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // LOADING
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-slate-500">
            Loading...
          </p>
        </div>
      </main>
    );
  }

  // NOT LOGIN
  if (!user) {
    return null;
  }

  return (
    <main className="relative min-h-screen bg-[#F8FAFC] overflow-hidden text-[#1E293B]">
      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-200/40 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-sky-200/30 rounded-full blur-3xl" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-6">
        {/* HEADER */}
        <div className="mb-8">
          <p className="text-[#2563EB] text-xs font-semibold uppercase tracking-[0.2em] mb-2">
            Warkop Biru Bunga
          </p>

          <h1 className="text-3xl md:text-5xl font-black">
            Manage Menu
          </h1>

          <p className="text-slate-500 mt-3 text-sm">
            Kelola Menu Secara Real-Time
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-[28px] shadow-xl p-5 md:p-6 mb-8">
          {/* TOP */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-black">
                {editId
                  ? "Edit Menu"
                  : "Add New Menu"}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {editId
                  ? "Update menu information"
                  : "Tambahkan menu baru"}
              </p>
            </div>

            {editId && (
              <button
                onClick={
                  resetForm
                }
                className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {/* NAME */}
            <input
              type="text"
              placeholder="Nama Menu"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="bg-[#F8FAFC] border border-blue-100 rounded-2xl px-4 py-3 outline-none text-sm"
            />

            {/* PRICE */}
            <input
              type="number"
              placeholder="Harga"
              value={price}
              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }
              className="bg-[#F8FAFC] border border-blue-100 rounded-2xl px-4 py-3 outline-none text-sm"
            />

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="bg-[#F8FAFC] border border-blue-100 rounded-2xl px-4 py-3 outline-none text-sm"
            >
              <option>
                Coffee
              </option>

              <option>
                Non Coffee
              </option>

              <option>
                Makanan
              </option>

              <option>
                Snack
              </option>
            </select>

            {/* IMAGE */}
            <label className="bg-[#F8FAFC] border border-blue-100 rounded-2xl px-4 py-3 flex items-center gap-3 cursor-pointer hover:border-[#2563EB] transition">
              <ImagePlus
                size={18}
                className="text-[#2563EB]"
              />

              <span className="text-sm text-slate-500 truncate">
                Upload Image
              </span>

              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={(e) => {
                  const file =
                    e.target
                      .files?.[0];

                  if (!file)
                    return;

                  const reader =
                    new FileReader();

                  reader.onloadend =
                    () => {
                      setImage(
                        reader.result as string
                      );
                    };

                  reader.readAsDataURL(
                    file
                  );
                }}
              />
            </label>

            {/* BUTTON */}
            <button
              onClick={
                handleSubmit
              }
              className={`rounded-2xl px-5 py-3 font-semibold flex items-center justify-center gap-2 transition shadow-lg text-white ${
                editId
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gradient-to-r from-[#2563EB] to-blue-500 hover:opacity-90"
              }`}
            >
              {editId ? (
                <>
                  <Save size={18} />
                  Save Menu
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Add Menu
                </>
              )}
            </button>
          </div>

          {/* PREVIEW */}
          {image && (
            <div className="mt-5">
              <p className="text-xs text-slate-400 mb-2">
                Preview Image
              </p>

              <img
                src={image}
                alt="Preview"
                className="w-28 h-28 object-cover rounded-2xl border border-blue-100 shadow-md"
              />
            </div>
          )}

          {/* DESCRIPTION */}
          <textarea
            placeholder="Deskripsi menu..."
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="mt-5 w-full bg-[#F8FAFC] border border-blue-100 rounded-2xl px-4 py-3 outline-none min-h-[120px] text-sm"
          />
        </div>

        {/* MENU GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {menus.map((menu) => (
            <div
  key={menu.firestoreId}
  className="group bg-white/80 backdrop-blur-md border border-white/50 rounded-[24px] overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition flex flex-col"
>
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={menu.image}
                  alt={menu.name}
                  className="w-full h-36 md:h-44 object-cover group-hover:scale-105 transition duration-500"
                />

                {/* SOLD OUT */}
  {menu.soldOut && (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-red-500 text-white px-4 py-2 rounded-full font-black text-sm shadow-lg">
        SOLD OUT
      </div>
    </div>
  )}

                {/* CATEGORY */}
                <div className="absolute top-3 left-3">
                  <div className="bg-white/90 backdrop-blur-md text-[#2563EB] px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold shadow-md">
                    {
                      menu.category
                    }
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4 flex flex-col flex-1">
                {/* INFO */}
                <div className="mb-4 flex-1">
                  <h2 className="font-black text-sm md:text-lg text-[#1E293B] line-clamp-1">
                    {menu.name}
                  </h2>

                  <p className="text-[#2563EB] font-black text-sm md:text-lg mt-2">
                    Rp{" "}
                    {menu.price.toLocaleString()}
                  </p>

                  <p className="text-slate-500 text-[11px] md:text-sm mt-2 line-clamp-2">
                    {menu.description || "\u00A0"}
                  </p>
                </div>

                {/* ACTION */}
<div className="grid grid-cols-2 gap-2 mt-auto">

  {/* SOLD OUT */}
  <button
    onClick={() =>
      toggleSoldOut(
        menu.firestoreId,
        menu.soldOut === true
      )
    }
    className={`col-span-2 py-2.5 rounded-2xl transition flex items-center justify-center gap-2 text-sm font-semibold ${
      menu.soldOut
        ? "bg-green-500 hover:bg-green-600 text-white"
        : "bg-orange-500 hover:bg-orange-600 text-white"
    }`}
  >
    {menu.soldOut ? "✓ Available" : "Sold Out"}
  </button>

  {/* EDIT */}
  <button
    onClick={() =>
      editMenu(menu)
    }
    className="bg-[#2563EB] hover:bg-blue-700 text-white py-2.5 rounded-2xl transition flex items-center justify-center gap-2 text-sm font-semibold"
  >
    <Pencil size={16} />
    Edit
  </button>

  {/* DELETE */}
  <button
    onClick={() =>
      deleteMenu(
        menu.firestoreId
      )
    }
    className="bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-2xl transition flex items-center justify-center gap-2 text-sm font-semibold"
  >
    <Trash2 size={16} />
    Delete
  </button>

</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}