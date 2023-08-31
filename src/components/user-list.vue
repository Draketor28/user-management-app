<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-8/12 p-8 bg-white rounded shadow">
      <div v-if="isLoading" class="text-center py-4">
        Loading... <!-- Display a loading indicator while fetching data -->
      </div>
      <div v-else>
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="py-3 px-0 text-left">Name</th>
              <th class="py-3 px-0 text-left">Email</th>
              <th class="py-3 px-0 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index" class="border-b">
              <td class="py-3 px-0 text-left">{{ user.name }}</td>
              <td class="py-3 px-0 text-left">{{ user.email }}</td>
              <td class="py-3 px-0 text-left">
                <button @click="openEditModal(user)" class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">
                  Edit
                </button>
                <button @click="confirmDelete(user.id)" class="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit modal code here -->
    <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div class="bg-white p-6 rounded shadow-md w-1/2">
        <h2 class="text-lg font-semibold mb-4">Edit User</h2>
        <div class="mb-4">
          <label for="editName" class="block text-gray-700 font-semibold mb-2">Name</label>
          <input v-model="editedUser.name" id="editName" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
        </div>
        <div class="mb-4">
          <label for="editEmail" class="block text-gray-700 font-semibold mb-2">Email</label>
          <input v-model="editedUser.email" id="editEmail" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" type="email" required />
        </div>
        <div class="text-center">
          <button @click="updateUser" class="w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Update User
          </button>
        </div>
      </div>
    </div>

    <!-- Delete modal code here -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div class="bg-white p-6 rounded shadow-md w-1/3">
        <h2 class="text-lg font-semibold mb-4">Delete User</h2>
        <p v-if="selectedUser">{{ selectedUser.name }}</p>
        <p v-if="selectedUser">{{ selectedUser.email }}</p>
        <div class="mt-4 flex space-x-2">
          <button @click="deleteUserConfirmed" class="flex-grow px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
            Yes, Delete
          </button>
          <button @click="closeDeleteModal" class="flex-grow px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { db } from '@/firebase.js';

export default {
  setup() {
    const users = ref([]);
    const isDeleteModalOpen = ref(false);
    const selectedUser = ref(null);
    const isEditModalOpen = ref(false);
    const editedUser = ref({ name: '', email: '' });
    const isLoading = ref(true);

    const fetchUsers = async () => {
      const snapshot = await db.collection('users').get();
      users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      isLoading.value = false;
    };

    const deleteUserData = async (userId) => {
      await db.collection('users').doc(userId).delete();
      // Fetch updated data after deletion
      await fetchUsers();
      closeDeleteModal();
      alert('User deleted successfully!');
    };

    onBeforeMount(fetchUsers);

    const confirmDelete = (userId) => {
      selectedUser.value = users.value.find(user => user.id === userId);
      isDeleteModalOpen.value = true;
    };

    const closeDeleteModal = () => {
      selectedUser.value = null;
      isDeleteModalOpen.value = false;
    };

    const deleteUserConfirmed = async () => {
      if (selectedUser.value) {
        const shouldDelete = window.confirm(`Are you sure you want to delete ${selectedUser.value.name}?`);
        if (shouldDelete) {
          await deleteUserData(selectedUser.value.id);
        }
      }
    };

    const openEditModal = (user) => {
      editedUser.value = { ...user };
      isEditModalOpen.value = true;
    };

    const updateUser = async () => {
      if (editedUser.value.id) {
        await db.collection('users').doc(editedUser.value.id).update({
          name: editedUser.value.name,
          email: editedUser.value.email,
        });
        isEditModalOpen.value = false;
        alert('User updated successfully!');
      }
    };

    return {
      users,
      isDeleteModalOpen,
      selectedUser,
      confirmDelete,
      closeDeleteModal,
      isEditModalOpen,
      editedUser,
      openEditModal,
      updateUser,
      deleteUserConfirmed,
      isLoading,
    };
  },
};
</script>

<style>
/* Add any additional Tailwind CSS classes here */
</style>
