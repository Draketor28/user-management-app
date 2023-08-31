<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-10/12 max-w-lg bg-white p-6 rounded shadow-md">
      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-semibold mb-2">
            Name
          </label>
          <input
            v-model="form.name"
            id="name"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            v-model="form.email"
            id="email"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            type="email"
            required
          />
        </div>

        <div class="text-center">
          <button
            type="submit"
            class="w-1/2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { db } from "@/firebase.js";
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const form = ref({ name: "", email: "" });

    const createUser = async (user) => {
      try {
        const usersCollection = db.collection('users');
        await usersCollection.add(user);
        return true;
      } catch (error) {
        console.error('Error creating user:', error);
        return false;
      }
    };

    const onSubmit = async () => {
      const created = await createUser({ ...form.value });

      if (created) {
        form.value.name = "";
        form.value.email = "";
        alert("User created successfully!");
        router.push('/user-list');
      } else {
        alert("Failed to create user. Please try again.");
      }
    };

    return { form, onSubmit };
  },
};
</script>
