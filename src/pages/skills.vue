<template>
  <section>
    <h1 class="text-3xl">My Skills</h1>

    <div class="mt-10 grid grid-cols-1 gap-y-10">
      <SkillList title="Programming Languages" :items="languageSkills" />
      <SkillList title="Frontend Technologies" :items="frontendSkills" />
      <SkillList title="Backend Technologies" :items="backendSkills" />
      <SkillList title="Database & Tools" :items="databaseSkills" />
      <SkillList title="Other Tools & Technologies" :items="otherSkills" />
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  languageSkills,
  frontendSkills,
  backendSkills,
  databaseSkills,
  otherSkills,
} from "../data/skills";

//
useHead({
  htmlAttrs: { lang: "en" },
});
</script>
