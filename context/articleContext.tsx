"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "@/db/configFirebase";
import { DataType, DbContextType } from "@/types/types";
import useAuth from "@/hooks/useAuth";

const ArticleContext = createContext<DbContextType | []>([]);

export const useFirebase = () => {
    const context = useContext(ArticleContext);
    if(!context){
        throw new Error('Une erreur a eu lieu dans le context');
    }
    return context;
}

export const ArticleProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [articles, setArticles] = useState<DataType[]>([]);
    const {user} = useAuth();
    const authorId = user?.uid as string;

    useEffect(() => {
        if(!authorId) return;

        const q = query(collection(db, 'articles'), where('authorId', "==", authorId));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data:DataType[] = [];
            snapshot.forEach((doc) => {
                data.push({id: doc.id, ...doc.data()} as DataType);
            })
        
            setArticles(data);
        })
        
        return ()=> unsubscribe();

    }, [authorId]);

    const addArticle = async (data: Omit<DataType, 'id'> & {image: string}) => {
        try {
            const docRef = await addDoc(collection(db, 'articles'), {...data, authorId});
            const newArticle : DataType = {id: docRef.id, ...data, authorId};
            setArticles([...articles, newArticle]);
        }catch(error){
            console.error("Une erreur est survenu lors de l'ajout de l'article :", error);
            throw new Error("Erreur lors de la création de l'article");
        }
    };

    const updateArticle = async(article: DataType) => {
        try{
            const articleRef = doc(db, 'articles', article.id);
            // fonction de firebase 
            await updateDoc(articleRef, article);
            setArticles(articles.map((a) => (a.id === article.id ? {...a, ...article} : a)));
        }catch(error){
            console.error("Une erreur est survenue pendant la mis a jour de l'article.", error);
            throw new Error("Erreur lors la modification de l'article");
        }
    };
    
    const deleteArticle = async (id:string) => {
            try {
                // fonction de firebase
                await deleteDoc(doc(db, 'articles', id));
                setArticles(articles.filter((article) => article.id !== id));
            }catch (error){
                console.error("Une erreur est survenue pendant la suppression de l'article.", error);
                throw new Error("Erreur lors la suppression de l'article");
            }
    };

    const value = {
        articles,
        addArticle,
        updateArticle,
        deleteArticle
    }

    return <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
}