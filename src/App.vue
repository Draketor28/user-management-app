<template>
  <div>
    <nav class="bg-gray-800 p-4">
      <ul class="flex space-x-4">
        <li>
          <router-link
            to="/"
            class="text-white hover:text-gray-200"
            exact
          >
            Home
          </router-link>
        </li>
        <li>
          <router-link
            to="/add-user"
            class="text-white hover:text-gray-200"
          >
            Add User
          </router-link>
        </li>
        <li>
          <router-link
            to="/user-list"
            class="text-white hover:text-gray-200"
          >
            User List
          </router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.router-link-active {
  font-weight: bold;
}
</style>
