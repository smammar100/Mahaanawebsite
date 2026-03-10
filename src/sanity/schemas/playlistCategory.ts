import { defineField, defineType } from "sanity";

export const playlistCategoryType = defineType({
  name: "playlistCategory",
  title: "Playlist Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
