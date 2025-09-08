#!/usr/bin/env python3
import pandas as pd
import os
import json
from pathlib import Path

# Excel_dataフォルダのパス
excel_folder = Path("/Users/sugimura/Local Sites/venue_management/Excel_data")

# 各Excelファイルの構造を分析
def analyze_excel_files():
    excel_files = list(excel_folder.glob("*.xlsx"))
    
    for excel_file in excel_files:
        print(f"\n{'='*60}")
        print(f"ファイル: {excel_file.name}")
        print('='*60)
        
        try:
            # Excelファイルを読み込み
            df = pd.read_excel(excel_file, sheet_name=0)
            
            # 列名を表示
            print("\n列名:")
            for i, col in enumerate(df.columns):
                print(f"  {i+1}. {col}")
            
            # データの概要
            print(f"\n行数: {len(df)}")
            print("\n最初の5行のデータ:")
            print(df.head().to_string())
            
            # データ型の確認
            print("\nデータ型:")
            print(df.dtypes.to_string())
            
        except Exception as e:
            print(f"エラー: {e}")

if __name__ == "__main__":
    analyze_excel_files()