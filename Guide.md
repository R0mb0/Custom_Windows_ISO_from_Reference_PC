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

## 5. Prepare ISO content

1. Connect the two USB sticks in the working pc
2. Prepare in the pc a working directory
3. Copy the content of the Windows installer USB stick inside the working directory.
4. Replace `install.wim` inside `/sources/` with `install.wim` inside the second USB stick

## 6. Create the ISO Image

1. Installing Windows ADK
   - **Using Choco**
     ```cmd
        choco install windows-adk
     ```
   - By the [installer](https://learn.microsoft.com/en-us/windows-hardware/get-started/adk-install)
3. Open `Deployment and Imaging Tools Enviroment`
4. Move inside the working dir
   - Use `dir` command to look inside the directory
   - Use `cd` to change the directory
6. Execute this command:
   ```cmd
      oscdimg.exe -m -o -u2 -udfver102 -bootdata:2#p0,e,b<Source Path>\boot\etfsboot.com#pEF,e,b<Source Path>\efi\microsoft\boot\efisys.bin <Source Path> <Saving path and name of file>
   ```

   - `<Source Path>` → The path of the working directory
   - `<Saving path and name of file>` → The path where save the iso and in the end the name of the file .iso without spaces
7. You will find your iso in your saving path from this link `<Saving path and name of file>`🎉💾

## [Reference Link](https://www.tenforums.com/tutorials/72031-create-windows-10-iso-image-existing-installation.html)
