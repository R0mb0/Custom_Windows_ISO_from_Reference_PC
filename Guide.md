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
  - [Windows 11 download](https://www.microsoft.com/en-us/software-download/windows11)

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
2. Type `diskpart` and press `Enter` to open the partition tool.  
3. Inside `diskpart`, type `list vol` and press `Enter` to list all storage volumes 💽  
4. Write down the output (for example on the sheet of paper) for the next steps 📝  
5. Exit `diskpart` by typing `exit` and pressing `Enter`.  
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

---

## 5. Prepare the ISO content 📂

1. Connect both USB sticks to the working PC 💾💻  
2. Create a working directory on the PC (for example: `C:\WinISO_Workdir`) 📁  
3. Copy all the content from the Windows installer USB stick into the working directory.  
4. In the working directory, go to the `sources` folder and replace the existing `install.wim` file with the `install.wim` from the second USB stick (the one created with `dism`).  

   - Original file path:  
     - `<working_directory>\sources\install.wim`  
   - New file path (from second USB):  
     - `<second_USB_drive_letter>:\install.wim`  

---

## 6. Create the ISO image 💿

1. Install the **Windows ADK** (Assessment and Deployment Kit):

   - **Using Chocolatey**:
     ```cmd
     choco install windows-adk
     ```
   - Or by using the official installer:  
     - [Windows ADK installer](https://learn.microsoft.com/en-us/windows-hardware/get-started/adk-install)

2. Open **Deployment and Imaging Tools Environment** as Administrator.  
3. Once you are inside the working directory, run the following command (all on one line), replacing the values in `<...>` with your paths:

   ```cmd
   oscdimg.exe -m -o -u2 -udfver102 -bootdata:2#p0,e,b<Source Path>\boot\etfsboot.com#pEF,e,b<Source Path>\efi\microsoft\boot\efisys.bin <Source Path> <Saving path and name of file>
   ```

   Where:

   - `<Source Path>` → the full path of the working directory (for example `C:\WinISO_Workdir`)  
   - `<Saving path and name of file>` → the full path and file name of the ISO you want to create  
     - Example: `D:\ISOs\Custom_Windows11.iso`  

4. When the command finishes successfully, your custom ISO image will be available at:  
   - `<Saving path and name of file>` 🎉💾  

---

## 7. Reference 🔗

- [Create Windows 10 ISO image from existing installation (TenForums)](https://www.tenforums.com/tutorials/72031-create-windows-10-iso-image-existing-installation.html)
