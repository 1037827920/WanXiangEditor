/**
 * �洢�����ݿ���û���Ϣ
 */
import { ObjectId } from "mongodb";
const crypto = require('crypto');

export interface DbUser {
    _id: ObjectId;
    uid: number;
    username: string;
    password: string;
    introduction: string;
    // roles: string[];

    create: {
        uid: string;
        time: Date;
    }

    update?: {
        uid: string,
        time: Date,
    }
}

/**
 * ���������uid
 */

// ���ɵ�ǰʱ�����SHA-256��ϣ������ע���ʱ������Uid
function generateHash() {
    const timeStamp = new Date().getTime().toString();
    const hash = crypto.createHash('sha256').update(timeStamp).digest('hex');
    return hash;
  }

// Uid��Χ��0-9999
function hashToUid(hash: string) {
    // ȡ��ϣ��ǰ5���ַ����������16����ת��Ϊ10����
    const decimalValue = parseInt(hash.substring(0, 5), 16);
    return decimalValue % 1000;
  }



  // ��֤UID��Ψһ�ԡ�
function isUidUnique(uid: string): boolean {
    // ����Ӧ���������ݿ��ѯUID�Ƿ�Ψһ��������ʱʹ��Setģ��
    //return !existingUids.has(uid);
    return true;
  }
  
// ����UID��ʹUID�̶�Ϊ��λ����
function generateNumericUid() {
    let uid = hashToUid(generateHash()).toString();
  
    // ������λ������²�0
    while (uid.length < 4) {
      uid = '0' + uid;
    }
    return uid;
    while(!isUidUnique(uid)){
      uid = (parseInt(uid) + 1).toString().padStart(4, '0');//Hash��ͻ��uid+1
    }
    //����Ӧ��Ҫ�������ݿ⣬�����ɵ���Uid�������ݿ���
    
    //����д�������
  
    return uid;
  }