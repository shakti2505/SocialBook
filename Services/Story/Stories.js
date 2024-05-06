import express from "express";
import TextstoryModal from "../../models/Story/Text_story.js";
import { authorization } from "../../middleware/AuthMiddleware.js";
import userModel from "../../models/user.js";
import UserFriendList from "../../models/FriendList.js";
import { createTextStory } from "../../draw.js";
import fs from "fs";
import cloudinary from "../../cloudinary/cloudinary.js";

const router = express.Router();
// create text stories

router.post("/create_text_story", authorization, async (req, res) => {
  try {
    const UserId = req.userId;
    const { storyContent, storybg, storyFont, storyOwnerName, storyOwnerdp } =
      req.body;

    if (!storyContent) {
      return res.status(400).json({ message: "Please provide story content!" });
    }
    const newtextStory = new Textstory({
      user: UserId,
      content: storyContent,
      bgColor: storybg,
      storyFont: storyFont,
      storyOwnerdp: storyOwnerdp,
      storyOwnerName: storyOwnerName,
    });
    const saveTextStory = await newtextStory.save();
    return res
      .status(201)
      .json({ message: "Story added successfully", saveTextStory });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
});

router.get("/get_text_stories", authorization, async (req, res) => {
  try {
    const UserId = req.userId;
    const loggedInUser = await userModel.findById(UserId);
    if (!loggedInUser) {
      return res.status(400).send("No logged in User found");
    }
    //get logged in user friends
    const LoggedInUserfriends = await UserFriendList.find({ user: UserId });
    let friendstextStrories = [];
    for (const item of LoggedInUserfriends) {
      const textStories = await TextstoryModal.find({ user: item.friend_ID });
      friendstextStrories = friendstextStrories.concat(textStories);
    }
    const textStories = await TextstoryModal.find({ user: UserId });
    const allTextStories = textStories.concat(friendstextStrories);
    return res.status(200).json({ textStories: allTextStories });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
});

router.post("/create_text_storyv2", authorization, async (req, res) => {
  try {
    const UserId = req.userId;
    const { storyContent, storybg, storyFont, storyOwnerName, storyOwnerdp } =
      req.body;
    if (!storyContent) {
      return res.status(400).json({ message: "Please provide story content!" });
    }
    createTextStory(storyContent, storybg, storyFont);
    const Textstory = fs.readFileSync("./image.png");
    const base64Data = Buffer.from(Textstory).toString("base64");
    const uploadStory = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Data}`,
      {
        upload_preset: "SocialBook_SB",
        allowed_formats: ["png", "jpg", "jpeg"],
      }
    );

    if (uploadStory.url) {
      const newtextStory = new TextstoryModal ({
        user: UserId,
        storyOwnerdp: storyOwnerdp,
        storyOwnerName: storyOwnerName,
        storyURL: uploadStory.url,
      });

      await newtextStory.save();
      return res.status(201).json({ message: "Story added successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
}); 

export default router;
