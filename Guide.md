# Guide 📘

## 1. Requirements ✅

- Know how to access the BIOS settings of the target PC ⚙️
- Two USB sticks (of at least 16 GB) 💾💾
- A sheet of paper 📝
- A pen 🖊️
- Rufus tool:
  - `choco install rufus`
  - [Rufus](https://rufus.ie/en/)
- Windows installation image:
  - [Windows](https://www.microsoft.com/en-us/software-download/windows11)

---

## 2. Flash the Windows 11 image to the USB stick 💿➡️💾

1. Connect the first USB stick to the PC 
2. Open Rufus 
3. Select the correct USB stick  
   - [![1.png](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/1.png?raw=true)](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/1.png)
4. Select the Windows 11 ISO  
   - [![2.png](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/2.png?raw=true)](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/2.png)
5. Set the correct BIOS/boot partition format  
   - If the target PC uses UEFI, the partition table must be **GPT**  
   - [![3.png](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/3.png?raw=true)](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/3.png)
6. Check that the file system is **NTFS**  
   - [![4.png](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/4.png?raw=true)](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/4.png)
7. Other options that you can set for the Windows ISO image:  
   - [![5.png](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/5.png?raw=true)](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/5.png)

---

## 3. Prepare the target PC 🖥️

1. Turn off the target PC (if it is on) 
2. Connect both USB sticks 💾💾
3. Turn on the PC and enter the BIOS ⚙️
4. Set the first USB stick as the boot device  
   - At the end of the guide, it may be necessary to set **Windows Boot Manager** as the default boot option 🔁

---

## 4. Steps inside the Windows installer 🪟

1. Press `Shift + F10` to open **Command Prompt (cmd)** ⌨️
2. Type `diskpart` and press `Enter` to open the partition tool
3. Inside `diskpart`, type `list vol` and press `Enter` to list all storage volumes 💽
4. Write down the output (for example on the sheet of paper) for the next steps 📝
5. Exit `diskpart` by typing `exit` and pressing `Enter`
6. Now type the following command (all on one line), customizing the values in angle brackets `<...>`:

   ```cmd
   dism /capture-image /imagefile:<drive_letter_of_second_USB>:\install.wim /capturedir:<drive_letter_where_Windows_is_installed>:\ /scratchdir:<same_drive_as_imagefile>:\ /name:<image_name_without_spaces> /compress:maximum /checkintegrity /verify /bootable
   ```

   - `<drive_letter_of_second_USB>` → the drive letter of the second USB stick (use the notes from `list vol`)  
   - `<drive_letter_where_Windows_is_installed>` → the drive letter where Windows is installed (for example `C`)  
   - `<same_drive_as_imagefile>` → usually the same as `<drive_letter_of_second_USB>`  
   - `<image_name_without_spaces>` → the name you want to give to the image (no spaces)  

7. At the end of the process, you can turn off the PC by typing:

   ```cmd
   wpeutil shutdown
   ```

   and pressing `Enter` 📴

8. The system image will be saved on the second USB stick with the name you chose! 🎉💾
