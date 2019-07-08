package com.fiberlink.maas360.android.appSdkSampleApp;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import javax.crypto.NoSuchPaddingException;

import android.os.Environment;
import android.util.Base64;

import com.fiberlink.maas360.android.dlpsdk.encrypt.MaaS360SecureInputStream;
import com.fiberlink.maas360.android.dlpsdk.encrypt.MaaS360SecureOutputStream;
import com.fiberlink.maas360.util.Maas360Logger;
import com.fiberlink.maas360sdk.util.MaaS360SDKEncryptionHelper;
import com.fiberlink.secure.EncryptionInfo;
import com.fiberlink.secure.EncryptionInfo.EncryptionAlgo;

public class EncryptionAPIs
{
    private static final String LOG_TAG = EncryptionAPIs.class.getSimpleName();

    static String ecbEncrypt = "12345678901234561234567890123456";
    private static int ecbpadding = 0;
    private static int cbcpadding = 0;

    public static String encryptionHelperEncrypt(String text) throws Exception
    {
        return MaaS360SDKEncryptionHelper.encrypt(text);
    }

    public static String encryptionHelperMaaSKeyManagementEncrypt(String text) throws Exception
    {
        try {
            return MaaS360SDKEncryptionHelper.encrypt(text, true);
        }
        catch (IllegalStateException e) {
            Maas360Logger.e(LOG_TAG, e);
            return "NOT_SUPPORTED - " + e.getMessage();
        }
    }

    public static String encryptionHelperDecrypt(String text) throws Exception
    {
        String encodedEncryptedString = encryptionHelperEncrypt(text);
        return MaaS360SDKEncryptionHelper.decrypt(encodedEncryptedString);
    }

    public static String encryptionHelperMaaSKeyManagementDecrypt(String text) throws Exception
    {
        String encodedEncryptedString = encryptionHelperMaaSKeyManagementEncrypt(text);
        try {
            return MaaS360SDKEncryptionHelper.decrypt(encodedEncryptedString, true);
        }
        catch (IllegalStateException e) {
            Maas360Logger.e(LOG_TAG, e);
            return "NOT_SUPPORTED - " + e.getMessage();
        }
    }

    // Using the MaaS360SecureOutputStream with ECB encryption.
    public static String maasSecureOutputStreamECBEncryption(String text, boolean useMaaSKeyManagement) throws InvalidKeyException,
            NoSuchAlgorithmException, IOException
    {
        String encodedEncKey = Base64.encodeToString(ecbEncrypt.getBytes(), Base64.DEFAULT);
        File newFile = new File(Environment.getExternalStorageDirectory().getAbsolutePath(), "TestECBFile.txt");
        if (newFile.exists()) {
            newFile.delete();
        }

        newFile.createNewFile();
        newFile.setWritable(true);
        FileOutputStream os = new FileOutputStream(newFile);

        MaaS360SecureOutputStream sos;
        if (useMaaSKeyManagement) {
            try {
                sos = new MaaS360SecureOutputStream(os);
            }
            catch (IllegalStateException e) {
                Maas360Logger.e(LOG_TAG, e);
                return "NOT_SUPPORTED - " + e.getMessage();
            }
        }
        else {
            EncryptionInfo info = new EncryptionInfo(encodedEncKey, 0, EncryptionAlgo.AES_256_ECB_PKCS5, "");
            sos = new MaaS360SecureOutputStream(os, info);
        }

        sos.write(text.getBytes());
        ecbpadding = sos.getPaddingLength();
        sos.flush();
        sos.close();
        return "Writing \"" + text + "\" to file. Done writing data.";
    }

    // Using the MaaS360SecureInputStream with ECB encryption.
    public static String maasSecureInputStreamECBEncryption(String text, boolean useMaaSKeyManagement) throws InvalidKeyException,
            NoSuchAlgorithmException, IOException, NoSuchPaddingException
    {
        String encodedEncKey = Base64.encodeToString(ecbEncrypt.getBytes(), Base64.DEFAULT);
        File newFile = new File(Environment.getExternalStorageDirectory().getAbsolutePath(), "TestECBFile.txt");
        FileInputStream is = new FileInputStream(newFile);

        MaaS360SecureInputStream sis;
        if (useMaaSKeyManagement) {
            try {
                sis = new MaaS360SecureInputStream(is);
            }
            catch (IllegalStateException e) {
                Maas360Logger.e(LOG_TAG, e);
                return "NOT_SUPPORTED - " + e.getMessage();
            }
        }
        else {
            EncryptionInfo info = new EncryptionInfo(encodedEncKey, ecbpadding, EncryptionAlgo.AES_256_ECB_PKCS5, "");
            sis = new MaaS360SecureInputStream(is, info);
        }

        byte[] readData = new byte[16];
        ByteArrayOutputStream bo = new ByteArrayOutputStream();
        while (sis.read(readData) != -1) {
            bo.write(readData);
        }

        sis.close();
        return new String(bo.toByteArray());
    }

    // Using the MaaS360SecureOutputStream with CBC encryption.
    public static String maasSecureOutputStreamCBCEncryption(String text, boolean useMaaSKeyManagement) throws InvalidKeyException,
            NoSuchAlgorithmException, Exception, IOException
    {
        // String encodedEncKey = Base64.encodeToString(ecbEncrypt.getBytes(), Base64.DEFAULT);
        File newFile = new File(Environment.getExternalStorageDirectory().getAbsolutePath(), "TestCBCFile.txt");
        if (newFile.exists()) {
            newFile.delete();
        }

        newFile.createNewFile();
        newFile.setWritable(true);
        FileOutputStream os = new FileOutputStream(newFile);

        // The init vector should be 16 bytes

        MaaS360SecureOutputStream sos;
        if (useMaaSKeyManagement) {
            try {
                sos = new MaaS360SecureOutputStream(os);
            }
            catch (IllegalStateException e) {
                Maas360Logger.e(LOG_TAG, e);
                return "NOT_SUPPORTED - " + e.getMessage();
            }
        }
        else {
            EncryptionInfo info = MaaS360SDKEncryptionHelper.getMaaS360SecureOutputStreamEncryptionInfo();
            sos = new MaaS360SecureOutputStream(os, info);
        }

        sos.write(text.getBytes());
        cbcpadding = sos.getPaddingLength();
        sos.flush();
        sos.close();
        return "Writing \"" + text + "\" to file. Done writing data.";
    }

    // Using the MaaS360SecureInputStream with CBC encryption.
    public static String maasSecureInputStreamCBCEncryption(String text, boolean useAdvanceKeyManagement) throws InvalidKeyException,
            NoSuchAlgorithmException, IOException, NoSuchPaddingException, Exception
    {
        // String encodedEncKey = Base64.encodeToString(ecbEncrypt.getBytes(), Base64.DEFAULT);
        File newFile = new File(Environment.getExternalStorageDirectory().getAbsolutePath(), "TestCBCFile.txt");
        FileInputStream is = new FileInputStream(newFile);

        MaaS360SecureInputStream sis;
        if (useAdvanceKeyManagement) {
            try {
                sis = new MaaS360SecureInputStream(is);
            }
            catch (IllegalStateException e) {
                Maas360Logger.e(LOG_TAG, e);
                return "NOT_SUPPORTED - " + e.getMessage();
            }
        }
        else {
            // The init vector should be 16 bytes
            EncryptionInfo info = MaaS360SDKEncryptionHelper.getMaaS360SecureInputStreamEncryptionInfo(cbcpadding);
            sis = new MaaS360SecureInputStream(is, info);
        }

        byte[] readData = new byte[16];

        ByteArrayOutputStream bo = new ByteArrayOutputStream();
        while (sis.read(readData) != -1) {
            bo.write(readData);
        }

        sis.close();
        return new String(bo.toByteArray());
    }

    // Creating a encrypted DB.
//    public static void createEncrypteDB()
//    {
//        MainApplication.getApplication().getDao();
//    }
//
//    public static void addDataToDB(String data)
//    {
//        MainApplication.getApplication().getDao().insertData(data);
//    }
//
//    public static List<String> getDBData()
//    {
//        return MainApplication.getApplication().getDao().getAll();
//    }

}
